/* eslint-disable @typescript-eslint/ban-types */
import { IAppContext, HttpServerError } from "Server/types";
import { Context } from "koa";

const middleware = (context: IAppContext) => async (
   ctx: Context,
   next: Function
): Promise<void> => {
   try {
      await next();
   } catch (err) {
      //TODO log more info from ctx
      context.services.appLogger.httpError(ctx, err);
      ctx.status = HttpServerError.Internal;
      ctx.body = ":(";
   }
};

export default middleware;
