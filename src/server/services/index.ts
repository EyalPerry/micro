/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   Services,
   ServiceContext,
   ServiceDefinition,
   GetServicesOptions,
   ServiceDefinitions,
} from "Server/types";

import { definition as logger } from "./Logger.service";
import { definition as secret } from "./Secret.service";

export const definitions: ServiceDefinitions = {
   secret,
   logger,
};

export const getServices = async (options: GetServicesOptions): Promise<Services> => {
   const services: Services = {} as any;

   return Object.values(definitions).reduce(
      (result: any, definition: ServiceDefinition<keyof Services>) => {
         const { name, factory } = definition;
         const objectOptions: ServiceContext = {
            services,
            config: options.config,
         };

         result[name] = factory(objectOptions);
         return result;
      },
      services
   );
};
