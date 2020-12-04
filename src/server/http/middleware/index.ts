import Koa from "koa";

import { IAppContext, IEndpoint } from "Server/types";

import error from "./error";
import rest from "./rest";

export default (app: Koa, endpoints: IEndpoint[], context: IAppContext): void => {
   const middlewares = [error];

   for (const middleware of middlewares) {
      app.use(middleware(context));
   }

   rest(endpoints, app, context);
};
