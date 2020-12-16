import { DomainOptions, IItemDomain, IRequestContext, IResponse } from "Server/types";

export class ItemDomain implements IItemDomain {
   constructor(private options: DomainOptions) {}
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   create = async (request: unknown, ctx: IRequestContext): Promise<IResponse<unknown>> => {
      return {
         outcome: "not-implemented",
      };
   };
}
