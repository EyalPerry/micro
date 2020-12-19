import {
   CreateItemRequest,
   DeleteItemByIdRequest,
   IItemDomain,
   IRequestContext,
   IResponse,
   ReadItemByIdRequest,
   ReadItemResponse,
   UpdateItemByIdRequest,
   CreateItemResponse,
   UpdateItemResponse,
} from "Server/types";

export class ItemsDomain implements IItemDomain {
   async create(
      request: CreateItemRequest,
      ctx: IRequestContext
   ): Promise<IResponse<CreateItemResponse>> {
      const id = await ctx.app.models.items.create(request.data);
      return {
         outcome: "created",
         payload: { id },
      };
   }

   async readById(
      request: ReadItemByIdRequest,
      ctx: IRequestContext
   ): Promise<IResponse<ReadItemResponse | null>> {
      const value = await ctx.app.models.items.getById(request.id);
      return {
         outcome: value ? "ok" : "not-found",
         payload: value ? { value } : null,
      };
   }

   async updateById(
      request: UpdateItemByIdRequest,
      ctx: IRequestContext
   ): Promise<IResponse<UpdateItemResponse | null>> {
      const value = await ctx.app.models.items.shallowUpdateById(request.id, request.data);
      return {
         outcome: value ? "ok" : "not-found",
         payload: value ? { value } : null,
      };
   }

   async deleteById(
      request: DeleteItemByIdRequest,
      ctx: IRequestContext
   ): Promise<IResponse<unknown>> {
      const success = await ctx.app.models.items.deleteById(request.id);
      return {
         outcome: success ? "ok" : "not-found",
      };
   }
}
