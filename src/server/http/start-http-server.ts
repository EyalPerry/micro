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
   context.services.logger.debug(
      `listening on http://${context.config.http.host}:${context.config.http.port}`
   );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const onHttpServerError = (context: IAppContext) => (err: any, ctx: Context): void => {
   context.services.logger.error("server error", err, ctx);
};
