import { Services, AppConfig, Models, DomainObjects } from "Server/types";
import { IDatabaseConnection } from "Server/types";

export interface IAppContext {
   config: AppConfig;
   services: Services;
   models: Models;
   domain: DomainObjects;
   databaseConnection: IDatabaseConnection;
}
