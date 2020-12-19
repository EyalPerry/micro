import { MongoClient, connect, MongoClientOptions, Db } from "mongodb";
import { DatabaseInstanceOptions, IDatabaseConnection, DatabaseConfig } from "Server/types";

export async function connectToDatabase(
   options: DatabaseInstanceOptions
): Promise<IDatabaseConnection> {
   const { url } = options;

   const clientOptions: MongoClientOptions = {
      useNewUrlParser: true,
      keepAlive: true,
      useUnifiedTopology: true,
   };

   const client = await connect(url, clientOptions);
   return new MongoConnection(client, options.config);
}

class MongoConnection implements IDatabaseConnection {
   private _database: Db;

   disconnect = (): Promise<void> => {
      return this.client.close();
   };

   get client(): MongoClient {
      return this._client;
   }

   get database(): Db {
      return this._database;
   }

   getDatabase = (name: string) => this.client.db(name);

   constructor(private _client: MongoClient, config: DatabaseConfig) {
      this._database = this.getDatabase(config.name);
   }
}
