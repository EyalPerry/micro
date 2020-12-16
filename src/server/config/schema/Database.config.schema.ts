import { ConfigSchemaPart } from "Server/types";
import { string } from "Server/validation";

export const database: ConfigSchemaPart<"database"> = {
   name: string(),
};
