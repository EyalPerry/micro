import { IResponse, IRequestContext } from "Server/types";

export interface CreateRequest {
   data: Record<string, unknown>;
}

export interface CreateResponse {
   id: string;
}

export interface ReadRequest {
   id: string;
}

export interface ReadResponse {
   value: Record<string, unknown>;
}

export interface UpdateRequest {
   id: string;
   data: Record<string, unknown>;
}

export interface UpdateResponse {
   value: Record<string, unknown>;
}

export interface DeleteRequest {
   id: string;
}

export interface IItemDomain {
   create(request: CreateRequest, ctx: IRequestContext): Promise<IResponse<CreateResponse>>;

   readbyId(request: ReadRequest, ctx: IRequestContext): Promise<IResponse<ReadResponse | null>>;

   updateById(
      request: UpdateRequest,
      ctx: IRequestContext
   ): Promise<IResponse<UpdateResponse | null>>;

   deleteById(request: DeleteRequest, ctx: IRequestContext): Promise<IResponse<unknown>>;
}
