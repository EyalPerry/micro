import { Context } from "koa";

export interface ILoggerService {
   info: (event: string, ...args: unknown[]) => void;
   warn: (event: string, ...args: unknown[]) => void;
   error: (event: string, ...args: unknown[]) => void;
   fatal: (event: string, ...args: unknown[]) => void;
   debug: (event: string, ...args: unknown[]) => void;
   trace: (event: string, ...args: unknown[]) => void;

   httpError: (ctx: Context, err: unknown, ...args: unknown[]) => void;
   httpTrace: (ctx: Context, ...args: unknown[]) => void;
}

export type LoggerContext = "app" | "request";

export type LoggerHeader = [string, string];

export interface LoggerOptions {
   context: LoggerContext;
   headerData?: LoggerHeader[];
}

export interface ILoggerFactoryService {
   create: (options: LoggerOptions) => ILoggerService;
}
