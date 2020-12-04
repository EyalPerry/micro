import { DatabaseConfig, HttpConfig, ServerConfig } from "Server/types";

export enum Environments {
   production = "production",
   test = "test",
   development = "development",
}

export interface AppConfig {
   database: Readonly<DatabaseConfig>;
   http: Readonly<HttpConfig>;
   server: Readonly<ServerConfig>;
}
