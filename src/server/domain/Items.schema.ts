import { DomainObjectSchemas } from "Server/types";
import * as v from "Server/validation";
export const schemas: DomainObjectSchemas<"item"> = {
   create: v.object({}),
};
