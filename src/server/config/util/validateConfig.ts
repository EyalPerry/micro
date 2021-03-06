/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConfig, ValidationOptions } from "Server/types";
import { object, validate } from "Server/validation";

import { schema } from "../schema";

export async function validateConfig(value: any): Promise<AppConfig> {
   const options: ValidationOptions = {
      stripUnknown: true,
      abortEarly: false,
      recursive: true,
   };

   return validate<AppConfig>(object(schema).required(), value, options);
}
