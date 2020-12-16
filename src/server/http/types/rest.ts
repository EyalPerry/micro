/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainObjects, IRequestContext, Schema } from "Server/types";

export type HttpMethod = "get" | "put" | "post" | "delete" | "patch" | "head" | "options";

export type SchemaFactory = (request: Record<string, unknown>, ctx: IRequestContext) => Schema<any>;
export type HttpHandlerSchema = Schema<any> | SchemaFactory | null;

export interface IHttpHandler<
   TDomain extends keyof DomainObjects,
   TFunc extends keyof DomainObjects[TDomain]
> {
   route: string | string[];
   method: HttpMethod;
   domain: TDomain;
   schema: HttpHandlerSchema;
   func: TFunc;
   fromHeaders?: {
      [header: string]: string;
   };
}

export interface IHttpEndpoint {
   route: string;
   handlers: IHttpHandler<any, any>[];
}
