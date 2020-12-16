import { ModelsOptions, Models, IDatabaseConnection } from "Server/types";

import { ItemModel } from "./ItemModel";
export * from "./connectToDatabase";

export async function getModels(
   connection: IDatabaseConnection,
   options: ModelsOptions
): Promise<Models> {
   return {
      items: new ItemModel(connection, options),
   };
}
