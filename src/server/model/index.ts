import { ModelsOptions, Models, IDatabaseConnection } from "Server/types";

import { Entity } from "./Entity.model";
export * from "./connectToDatabase";

export async function getModels(
   connection: IDatabaseConnection,
   options: ModelsOptions
): Promise<Models> {
   return {
      entity: new Entity(connection, options),
   };
}
