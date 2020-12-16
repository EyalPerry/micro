import { connectToDatabase, getModels } from "Server/model";
import { Models } from "Server/types";

export async function getTestModels(): Promise<Models> {
   const url =
      process.env.X_TEST_DB_URL || `mongodb://localhost:${process.env.X_APP_DB_PORT || "27017"}`;
   const databaseConnection = await connectToDatabase({ url, config: { name: "test" } });
   return getModels(databaseConnection);
}
