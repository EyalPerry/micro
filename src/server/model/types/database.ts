import { Db, MongoClient } from "mongodb";
import { DatabaseConfig } from "Server/types";

export interface IDatabaseConnection {
   readonly client: MongoClient;
   readonly database: Db;
   getDatabase: (name: string) => Db;
   disconnect: () => Promise<void>;
}

export interface DatabaseInstanceOptions {
   url: string;
   config: DatabaseConfig;
}
