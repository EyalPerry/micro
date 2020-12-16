import {
   CreateRequest,
   DeleteRequest,
   DomainOptions,
   IItemDomain,
   IRequestContext,
   IResponse,
   ReadRequest,
   ReadResponse,
   UpdateRequest,
} from "Server/types";

export class ItemDomain implements IItemDomain {
   constructor(private options: DomainOptions) {}
   create(request: CreateRequest, ctx: IRequestContext): Promise<IResponse<ReadResponse>> {
      throw new Error("Method not implemented.");
   }
   readbyId(request: ReadRequest, ctx: IRequestContext): Promise<IResponse<ReadResponse>> {
      throw new Error("Method not implemented.");
   }
   updateById(request: UpdateRequest, ctx: IRequestContext): Promise<IResponse<unknown>> {
      throw new Error("Method not implemented.");
   }
   deleteById(request: DeleteRequest, ctx: IRequestContext): Promise<IResponse<unknown>> {
      throw new Error("Method not implemented.");
   }
}
