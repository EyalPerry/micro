import { ModelsOptions, Models, IDatabaseConnection } from "Server/types";

import { ItemModel } from "./ItemModel";
export * from "./connectToDatabase";

export async function getModels(
   connection: IDatabaseConnection,
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   options: ModelsOptions
): Promise<Models> {
   return {
      items: new ItemModel(connection.database),
   };
}
