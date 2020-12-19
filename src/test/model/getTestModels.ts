import { connectToDatabase, getModels } from "Server/model";
import { Models } from "Server/types";

export interface TestModels {
   models: Models;
   afterEach: () => Promise<void>;
}

export async function getTestModels(): Promise<TestModels> {
   const dbName = "test";
   const url =
      process.env.X_TEST_DB_URL || `mongodb://localhost:${process.env.X_APP_DB_PORT || "27017"}`;
   const databaseConnection = await connectToDatabase({ url, config: { name: dbName } });
   const models = await getModels(databaseConnection);
   return {
      models,
      afterEach: () => databaseConnection.database.dropDatabase(),
   };
}
