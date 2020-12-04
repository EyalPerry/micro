/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DomainObjects } from "Server/types";

export type HttpMethod = "get" | "put" | "post" | "delete" | "patch" | "head" | "options";

export interface IHandler<
   TDomain extends keyof DomainObjects,
   TFunc extends keyof DomainObjects[TDomain]
> {
   route: string | string[];
   method: HttpMethod;
   domain: TDomain;
   func: TFunc;
   fromHeaders?: {
      [header: string]: string;
   };
}

export interface IEndpoint {
   route: string;
   handlers: IHandler<any, any>[];
}
