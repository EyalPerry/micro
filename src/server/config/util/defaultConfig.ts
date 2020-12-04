import { AppConfig, ServerConfig, DatabaseConfig, HttpConfig } from "Server/types";

const database: DatabaseConfig = {
   reconnectTimes: 10000,
   reconnectInterval: 2000,
   initialConnectTimeout: 10000,
   connectedEvent: "connected",
   keepAliveInitialDelay: 10000,
   connectTimeoutMS: 10000,
};

const http: HttpConfig = {
   port: 3000,
   host: "0.0.0.0",
   body: {
      jsonLimit: "17mb",
      text: false,
      urlencoded: false,
   },
};

const server: ServerConfig = {
   maxItemsPerPage: 20,
};

export const defaultConfig: AppConfig = {
   database,
   server,
   http,
};
