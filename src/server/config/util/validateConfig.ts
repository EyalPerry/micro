/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConfig } from "Server/types";
import { appConfig } from "../AppConfig.schema";

export async function validateConfig(value: any): Promise<AppConfig> {
   const options = {
      stripUnknown: true,
      abortEarly: false,
      recursive: true,
   };

   return appConfig.validate(value, options);
}
