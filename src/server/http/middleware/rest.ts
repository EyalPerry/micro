/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Koa from "koa";
import koaBody from "koa-body";
import Router from "@koa/router";
import { Context } from "koa";
import _ from "lodash";

import {
   IAppContext,
   ResponseOutcome,
   HttpStatus,
   HttpClientError,
   HttpSuccess,
   HttpServerError,
   IHttpEndpoint,
   IHttpHandler,
} from "Server/types";
import { requestIdHeader } from "Server/constants";
import { uuid } from "Server/util";

type OutcomeToHttpResponseMap = {
   [Outcome in ResponseOutcome]: HttpStatus;
};

//Ensure every RequestOutcome maps to an http status
const outcomeToResponseMap: OutcomeToHttpResponseMap = {
   "bad-request": HttpClientError.BadRequest,
   "not-found": HttpClientError.NotFound,
   created: HttpSuccess.Created,
   unauthenticated: HttpClientError.Unauthorized,
   unexpected: HttpServerError.Internal,
   ok: HttpSuccess.Ok,
   "not-implemented": HttpServerError.NotImplemented,
   "insufficient-subscription": HttpClientError.PaymentRequired,
   unauthorized: HttpClientError.Forbidden,
   "already-exists": HttpClientError.BadRequest,
   conflict: HttpClientError.Conflict,
};

function respondWithOutcome(ctx: Context, outcome: ResponseOutcome, body?: any): void {
   const status = outcomeToResponseMap[outcome];
   ctx.status = status;
   if (typeof body !== "undefined" && body !== null) {
      ctx.body = body;
   }
}

function createHandlerMiddleware(context: IAppContext, handler: IHttpHandler<any, any>) {
   return async function handlerWrapperMiddleware(ctx: Context, next: Function) {
      const request: any = {
         ...(ctx.request.body || {}),
         ...(ctx.query || {}),
         ...(ctx.params || {}),
      };

      Object.entries<string>(handler.fromHeaders || {}).forEach(([path, header]) => {
         _.set(request, path, ctx.get(header));
      });

      const requestId = ctx.get(requestIdHeader) || uuid();
      context.services.logger.debug("received request", request);

      const domainObject = _.get(context.domain, handler.domain);
      const func: Function = _.get(domainObject, handler.func);

      const requestContext = {
         id: requestId,
         context,
      };

      const response = await func.call(domainObject, request, requestContext);

      if (response.meta) {
         ctx.set(response.meta);
      }

      ctx.set(requestIdHeader, requestId);
      respondWithOutcome(ctx, response.outcome, response.body);
      await next();
   };
}

const createEndpointRouter = (endpoint: IHttpEndpoint, context: IAppContext): Router => {
   const endpointRouter = new Router({ prefix: endpoint.route });

   for (const handlerDefinition of endpoint.handlers) {
      const { route, method } = handlerDefinition;
      const handlerMiddleware = createHandlerMiddleware(context, handlerDefinition);

      const routes = Array.isArray(route) ? route : [route];
      routes.forEach((routeEntry) => {
         endpointRouter.register(routeEntry, [method], handlerMiddleware);
      });
   }

   return endpointRouter;
};

const createRestApiRouter = (context: IAppContext, endpoints: IHttpEndpoint[]) => {
   const appRouter = new Router();

   appRouter.use(koaBody(context.config.http.body));

   for (const endpoint of endpoints) {
      const resourceRouter = createEndpointRouter(endpoint, context);
      appRouter.use(resourceRouter.routes(), resourceRouter.allowedMethods());
   }

   return appRouter;
};

export default (endpoints: IHttpEndpoint[], app: Koa, context: IAppContext): void => {
   const router = createRestApiRouter(context, endpoints);
   app.use(router.routes());
   app.use(router.allowedMethods());
};
