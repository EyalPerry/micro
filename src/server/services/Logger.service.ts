/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoggerService, ServiceDefinition, ServiceContext } from "Server/types";

export class LoggerService implements ILoggerService {
   constructor(private context: ServiceContext) {}

   error = (...args: any[]): void => {
      console.error(...args);
   };

   info = (...args: any[]): void => {
      console.log(...args);
   };

   debug = (...args: any[]): void => {
      if (process.env.NODE_ENV === "development") {
         console.debug(JSON.stringify(args, null, 3));
      }
   };
}

export const definition: ServiceDefinition<"logger"> = {
   name: "logger",
   factory: (options) => new LoggerService(options),
};
