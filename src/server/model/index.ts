import { ModelsOptions, Models, IDatabaseConnection } from "Server/types";

import { EntityModel } from "./EntityModel";
export * from "./connectToDatabase";

export async function getModels(
   connection: IDatabaseConnection,
   options: ModelsOptions
): Promise<Models> {
   return {
      entity: new EntityModel(connection, options),
   };
}
