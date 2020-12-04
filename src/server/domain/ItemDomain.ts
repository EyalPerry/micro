import { DomainOptions, IItemDomain, IRequest, IResponse } from "Server/types";

export class ItemDomain implements IItemDomain {
   constructor(private options: DomainOptions) {}
   create = async (request: IRequest<unknown>): Promise<IResponse<unknown>> => {
      return {
         outcome: "not-implemented",
      };
   };
}
