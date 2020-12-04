import { Db } from "mongodb";
import { DatabaseConfig } from "Server/types";

export interface IDatabaseConnection {
   database: (name: string) => Db;
   disconnect: () => Promise<void>;
}

export interface DatabaseInstanceOptions {
   url: string;
   config: DatabaseConfig;
}
