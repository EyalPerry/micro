import { number, oneOf } from "Server/validation";
import { ConfigSchemaPart } from "Server/types";

export const database: ConfigSchemaPart<"database"> = {
   reconnectTimes: number().integer().min(1).required(),
   reconnectInterval: number().integer().min(1).required(),
   initialConnectTimeout: number().integer().min(1).required(),
   connectedEvent: oneOf("connected", "all", "fullsetup").required(),
   keepAliveInitialDelay: number().integer().min(1).required(),
   connectTimeoutMS: number().integer().min(1).required(),
};
