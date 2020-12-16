import { DomainObjects } from "Server/types";

export type HttpMethod = "get" | "put" | "post" | "delete" | "patch" | "head" | "options";

export interface IHttpHandler<
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

export interface IHttpEndpoint {
   route: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   handlers: IHttpHandler<any, any>[];
}
