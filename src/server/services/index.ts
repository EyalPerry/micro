/* eslint-disable @typescript-eslint/no-explicit-any */
import { Services, GetServicesOptions } from "Server/types";

import { LoggerFactoryService } from "./LoggerService";
import { SecretService } from "./SecretService";

export const getServices = async (options: GetServicesOptions): Promise<Services> => {
   const loggerFactory = new LoggerFactoryService();
   return {
      loggerFactory,
      secret: new SecretService(),
      appLogger: loggerFactory.create({ context: "app" }),
   };
};
