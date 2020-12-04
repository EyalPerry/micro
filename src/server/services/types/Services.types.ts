import {
   ILoggerService,
   ISecretService,
} from "Server/types";

export interface Services {
   logger: ILoggerService;
   secret: ISecretService;
}
