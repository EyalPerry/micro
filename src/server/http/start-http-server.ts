import Koa, { Context } from "koa";
import { IAppContext } from "Server/types";
import http from "http";
import applyMiddleware from "./middleware";
import endpoints from "./endpoints";

export const startHTTPServer = async (context: IAppContext): Promise<void> => {
   const app: Koa = new Koa();
   app.on("error", onHttpServerError(context));

   applyMiddleware(app, endpoints, context);
   const server = http.createServer(app.callback());
   server.listen(
      context.config.http.port,
      context.config.http.host,
      onHttpServerListening(context)
   );
};

const onHttpServerListening = (context: IAppContext) => (): void => {
   context.services.appLogger.debug(
      `listening on http://${context.config.http.host}:${context.config.http.port}`
   );
};

const onHttpServerError = (context: IAppContext) => (err: unknown, ctx: Context): void => {
   context.services.appLogger.error("server error", err, ctx);
};
