import { IItemDomain, IRequestContext, IResponse } from "Server/types";

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
> = Parameters<DomainObjects[Domain][Func]>;
