import * as yup from "yup";
import { database } from "./Database.config.schema";
import { http } from "./Http.config.schema";

export enum Environments {
   production = "production",
   test = "test",
   development = "development",
}

export const appConfig = yup
   .object({
      database: database.required(),
      http: http.required(),
      environment: yup
         .mixed()
         .oneOf<string>(Object.values(Environments))
         .default(Environments.production),
   })
   .required();

export type AppConfig = yup.Asserts<typeof appConfig>;
