import { requestIdHeader } from "Server/constants";
import { ILoggerService, ILoggerFactoryService, LoggerOptions } from "Server/types";

import moment from "moment";
import { Context } from "koa";
import os from "os";

function formatHeaderPart(key: string, value: string) {
   return `[${key}:${value}]`;
}

function formatData(data: unknown): string {
   if (data instanceof Error) {
      const errorToLog = {
         ...data,
         name: data.name,
         message: data.message,
         stack: data.stack,
      };

      return formatHeaderPart("error", formatData(errorToLog));
   }

   switch (typeof data) {
      case "string":
         return data;
      case "object":
         return JSON.stringify(data, null, 3);
      default:
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         return (data as any).toString();
   }
}

type LogLevel = "trace" | "error" | "warn" | "fatal" | "info" | "debug";

export class LoggerService implements ILoggerService {
   constructor(private options: LoggerOptions) {}

   private formatLogHeader = (level: LogLevel) => {
      const headers = [];
      if (process.env.NODE_ENV === "development") {
         headers.push(["time", moment().format("HH:mm:ss.SSS")]);
      } else {
         headers.push(
            ["service", process.env.X_APP_SERVICE_NAME as string],
            ["time", moment.utc().toISOString()]
         );
      }

      headers.push(
         ["level", level],
         ["context", this.options.context],
         ...(this.options.headerData || [])
      );

      return headers.map(([key, value]) => formatHeaderPart(key, value)).join(" ");
   };

   private log = (level: LogLevel, ...args: any[]): void => {
      if (level === "debug" && process.env.NODE_ENV !== "development") {
         return;
      }

      console.log(
         "~~~[entry:start]~~~",
         os.EOL,
         this.formatLogHeader(level),
         os.EOL,
         args.map(formatData).join(os.EOL),
         os.EOL,
         "~~~[entry:end]~~~",
         os.EOL
      );
   };

   trace = (...args: unknown[]): void => {
      this.log("trace", ...args);
   };

   error = (...args: unknown[]): void => {
      this.log("error", ...args);
   };

   info = (...args: unknown[]): void => {
      this.log("info", ...args);
   };

   warn = (...args: unknown[]): void => {
      this.log("warn", ...args);
   };

   fatal = (...args: unknown[]): void => {
      this.fatal("fatal", ...args);
   };

   debug = (...args: unknown[]): void => {
      this.log("debug", ...args);
   };

   private httpRequest = (level: LogLevel, ctx: Context, ...args: unknown[]): void => {
      const requestId = ctx.get(requestIdHeader) || "n/a";
      this.log(level, formatHeaderPart("request-id", requestId), ...args);
   };

   httpError = (ctx: Context, err: unknown, ...args: unknown[]): void => {
      this.httpRequest(
         "error",
         ctx,
         err,
         { url: ctx.url, headers: ctx.headers, body: ctx.body, method: ctx.method },
         ...args
      );
   };

   httpTrace = (ctx: Context, ...args: unknown[]): void => {
      this.httpRequest("trace", ctx, ...args);
   };
}

export class LoggerFactoryService implements ILoggerFactoryService {
   create = (options: LoggerOptions): ILoggerService => new LoggerService(options);
}
