import { IAppContext } from "Server/types";
import path from "path";
import _ from "lodash";

interface SeedDatabaseOptions {
   db: string;
   folder: string;
}

type JsonMap = { [folder: string]: { [collection: string]: unknown[] } };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const context = require.context(__dirname, true, /^(.*)\.json$/);
const jsonMap: JsonMap = context.keys().reduce((result: JsonMap, key: string) => {
   const pathTokens = key.split(path.sep);
   const collectionName = pathTokens[pathTokens.length - 1].replace(".json", "");
   const folderName = pathTokens[pathTokens.length - 2];
   const collectionData = context(key);
   _.set(result, [folderName, collectionName], collectionData);

   return result;
}, {} as JsonMap);

export async function seedDatabase(ctx: IAppContext, options: SeedDatabaseOptions): Promise<void> {
   async function seedCollection(collectionData: unknown[], collectionName: string): Promise<void> {
      await ctx.databaseConnection
         .getDatabase(options.db)
         .collection(collectionName)
         .insertMany(collectionData);
   }

   const collections = _.get(jsonMap, [options.folder], {});
   await Promise.all(_.map(collections, seedCollection));
}
