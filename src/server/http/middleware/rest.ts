import { IRequestContext } from "./../../types/Request.types";
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
   IResponse,
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
   "unexpected-error": HttpServerError.Internal,
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
   if (!_.isNil(body)) {
      ctx.body = _.omitBy(body, _.isNil);
   }
}

function createHandlerMiddleware(appContext: IAppContext, handler: IHttpHandler<any, any>) {
   return async function handlerWrapperMiddleware(ctx: Context, next: Function) {
      const request: any = {
         ...(ctx.request.body || {}),
         ...(ctx.query || {}),
         ...(ctx.params || {}),
      };

      Object.entries<string>(handler.fromHeaders || {}).forEach(([path, header]) => {
         _.set(request, path, ctx.get(header));
      });

      let requestId = ctx.get(requestIdHeader);

      if (!requestId) {
         requestId = uuid();
         ctx.set(requestIdHeader, requestId);
      }

      appContext.services.appLogger.debug("received request", request);

      const domainObject = _.get(appContext.domain, handler.domain);

      if (!domainObject) {
         appContext.services.appLogger.fatal("unknown-domain-object", {
            domain: handler.domain,
            func: handler.func,
            url: ctx.url,
         });
         respondWithOutcome(ctx, "unexpected-error");
         return;
      }

      const func: Function = _.get(domainObject, handler.func);

      if (!func) {
         appContext.services.appLogger.fatal("unknown-domain-function", {
            domain: handler.domain,
            func: handler.func,
            url: ctx.url,
         });
         respondWithOutcome(ctx, "unexpected-error");
         return;
      }

      const requestContext: IRequestContext = {
         id: requestId,
         app: appContext,
         logger: appContext.services.loggerFactory.create({
            context: "request",
            headerData: [["request-id", requestId]],
         }),
      };

      requestContext.logger.trace("handling request", {
         domain: handler.domain,
         func: handler.func,
      });

      try {
         const response: IResponse<unknown> = await func.call(
            domainObject,
            request,
            requestContext
         );
         requestContext.logger.trace("request handled");
         if (response.meta) {
            ctx.set(response.meta);
         }

         ctx.set(requestIdHeader, requestId);
         respondWithOutcome(ctx, response.outcome, response.payload);
      } catch (err) {
         requestContext.logger.httpError(ctx, err);
         respondWithOutcome(ctx, "unexpected-error");
      }

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
