import {
   CreateRequest,
   DeleteRequest,
   IItemDomain,
   IRequestContext,
   IResponse,
   ReadRequest,
   ReadResponse,
   UpdateRequest,
   CreateResponse,
} from "Server/types";

export class ItemDomain implements IItemDomain {
   async create(request: CreateRequest, ctx: IRequestContext): Promise<IResponse<CreateResponse>> {
      const id = await ctx.app.models.items.create(request.data);
      return {
         outcome: "created",
         data: { id },
      };
   }

   async readbyId(request: ReadRequest, ctx: IRequestContext): Promise<IResponse<ReadResponse>> {
      const value = await ctx.app.models.items.getById(request.id);
      return {
         outcome: value ? "ok" : "not-found",
         data: { value },
      };
   }

   async updateById(request: UpdateRequest, ctx: IRequestContext): Promise<IResponse<unknown>> {
      const success = await ctx.app.models.items.shallowUpdateById(request.id, request.value);
      return {
         outcome: success ? "ok" : "not-found",
      };
   }

   async deleteById(request: DeleteRequest, ctx: IRequestContext): Promise<IResponse<unknown>> {
      const success = await ctx.app.models.items.deleteById(request.id);
      return {
         outcome: success ? "ok" : "not-found",
      };
   }
}
