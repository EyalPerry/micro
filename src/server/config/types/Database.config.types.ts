export interface DatabaseConfig {
   initialConnectTimeout: number;
   reconnectTimes: number;
   reconnectInterval: number;
   connectTimeoutMS: number;
   connectedEvent: string;
   keepAliveInitialDelay: number;
}
