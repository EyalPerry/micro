import {
   CreateRequest,
   DeleteByIdRequest,
   IItemDomain,
   IRequestContext,
   IResponse,
   ReadByIdRequest,
   ReadResponse,
   UpdateByIdRequest,
   CreateResponse,
   UpdateResponse,
} from "Server/types";

export class ItemsDomain implements IItemDomain {
   async create(request: CreateRequest, ctx: IRequestContext): Promise<IResponse<CreateResponse>> {
      const id = await ctx.app.models.items.create(request.data);
      return {
         outcome: "created",
         payload: { id },
      };
   }

   async readById(
      request: ReadByIdRequest,
      ctx: IRequestContext
   ): Promise<IResponse<ReadResponse | null>> {
      const value = await ctx.app.models.items.getById(request.id);
      return {
         outcome: value ? "ok" : "not-found",
         payload: value ? { value } : null,
      };
   }

   async updateById(
      request: UpdateByIdRequest,
      ctx: IRequestContext
   ): Promise<IResponse<UpdateResponse | null>> {
      const value = await ctx.app.models.items.shallowUpdateById(request.id, request.data);
      return {
         outcome: value ? "ok" : "not-found",
         payload: value ? { value } : null,
      };
   }

   async deleteById(request: DeleteByIdRequest, ctx: IRequestContext): Promise<IResponse<unknown>> {
      const success = await ctx.app.models.items.deleteById(request.id);
      return {
         outcome: success ? "ok" : "not-found",
      };
   }
}
