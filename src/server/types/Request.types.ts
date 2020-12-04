import { IAppContext } from "Server/types";

export type IRequest<T> = {
   $context: IAppContext;
   $id: string;
} & T;
