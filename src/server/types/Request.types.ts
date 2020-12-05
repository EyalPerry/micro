import { IAppContext } from "Server/types";

export interface IRequestContext {
   app: IAppContext;
   id: string;
}
