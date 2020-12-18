import { IItemDomain, IRequestContext, IResponse } from "Server/types";
import { SchemaOf } from "yup";

export type DomainFunction<Request, Payload> = (
   request: Request,
   ctx: IRequestContext
) => Promise<IResponse<Payload>>;

export interface DomainObjects {
   item: IItemDomain;
}

export type DomainFuncRequest<
   Domain extends keyof DomainObjects,
   Func extends keyof DomainObjects[Domain]
   //TODO follow up on https://github.com/microsoft/TypeScript/issues/42018
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   //@ts-expect-error
> = Parameters<DomainObjects[Domain][Func]>;

export type DomainFuncRequestSchemas = {
   [Domain in keyof DomainObjects]: {
      [Func in keyof DomainObjects[Domain]]: SchemaOf<DomainFuncRequest<Domain, Func>>;
   };
};
