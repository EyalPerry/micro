import { ConfigSchemaPart } from "Server/types";
import { number } from "Server/validation";

export const server: ConfigSchemaPart<"server"> = {
   maxItemsPerPage: number().positive().min(1).required(),
};
