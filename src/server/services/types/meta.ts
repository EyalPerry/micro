import {
   Services,
   ConfigName,
   AppConfig,
} from "Server/types";

export interface ServiceContext<
   S extends ServiceName = ServiceName,
   C extends ConfigName = ConfigName
> {
   services: Pick<Services, S>;
   config: Pick<AppConfig, C>;
}

export interface GetServicesOptions {
   config: AppConfig;
}

export type ServiceName = keyof Services;

export interface ServiceDefinition<
   Name extends ServiceName
> {
   name: Name;
   factory: (context: ServiceContext) => Services[Name];
}

export type ServiceDefinitions = {
   [Service in ServiceName]: ServiceDefinition<Service>;
};
