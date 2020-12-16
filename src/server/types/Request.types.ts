import { ILoggerService } from "Server/services/types";
import { IAppContext } from "Server/types";

export interface IRequestContext {
   app: IAppContext;
   id: string;
   logger: ILoggerService;
}
