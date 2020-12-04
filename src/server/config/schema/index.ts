import { ConfigSchema } from "Server/types";
import { object } from "Server/validation";
import { database } from "./Database.config.schema";
import { http } from "./Http.config.schema";
import { server } from "./Server.config.schema";

export const schema: ConfigSchema = {
   database: object(database),
   http: object(http),
   server: object(server),
};
