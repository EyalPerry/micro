import { MongoClient, connect, MongoClientOptions } from "mongodb";
import { DatabaseInstanceOptions, IDatabaseConnection } from "Server/types";

export async function connectToDatabase(
   options: DatabaseInstanceOptions
): Promise<IDatabaseConnection> {
   const { config, url } = options;

   const clientOptions: MongoClientOptions = {
      useNewUrlParser: true,
      reconnectTries: config.reconnectTimes,
      reconnectInterval: config.reconnectInterval,
      connectTimeoutMS: config.connectTimeoutMS,
      keepAlive: true,
      autoReconnect: true,
      useUnifiedTopology: true,
   };

   const client = await connect(url, clientOptions);
   return new MongoConnection(client);
}

class MongoConnection implements IDatabaseConnection {
   public disconnect = (): Promise<void> => {
      return this.client.close();
   };

   constructor(private client: MongoClient) {}
   database = (name: string) => this.client.db(name);
}
