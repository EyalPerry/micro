import { IItemDomain, AppConfig, Services, Models } from "Server/types";

export interface DomainOptions {
   config: AppConfig;
   services: Services;
   models: Models;
}

export interface DomainObjects {
   item: IItemDomain;
}
