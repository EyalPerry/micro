import { Models, IDatabaseConnection } from "Server/types";

import { ItemModel } from "./ItemModel";
export * from "./connectToDatabase";

export async function getModels(connection: IDatabaseConnection): Promise<Models> {
   return {
      items: new ItemModel(connection.database),
   };
}
