import { ConfigSchemaPart } from "Server/types";
import { number, string, boolean, object } from "Server/validation";

export const http: ConfigSchemaPart<"http"> = {
   port: number().min(0).max(65535).required(),
   host: string().required(),
   body: object({
      jsonLimit: string().min(3).required(),
      text: boolean().optional(),
      urlencoded: boolean().optional(),
   }).required(),
};
