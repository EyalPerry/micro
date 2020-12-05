import { DomainOptions, IItemDomain, IRequestContext, IResponse } from "Server/types";

export class ItemDomain implements IItemDomain {
   constructor(private options: DomainOptions) {}
   create = async (request: unknown, ctx: IRequestContext): Promise<IResponse<unknown>> => {
      return {
         outcome: "not-implemented",
      };
   };
}
