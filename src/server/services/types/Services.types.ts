import { AppConfig, ILoggerFactoryService, ISecretService, ILoggerService } from "Server/types";

export interface Services {
   loggerFactory: ILoggerFactoryService;
   appLogger: ILoggerService;
   secret: ISecretService;
}

export interface GetServicesOptions {
   config: AppConfig;
}
