import { IResponse, IRequestContext } from "Server/types";

export interface CreateRequest {
   data: unknown;
}

export interface CreateResponse {
   id: string;
}

export interface ReadRequest {
   id: string;
}

export interface ReadResponse {
   value: unknown;
}

export interface UpdateRequest {
   id: string;
   value: unknown;
}

export interface DeleteRequest {
   id: string;
}

export interface IItemDomain {
   create(request: CreateRequest, ctx: IRequestContext): Promise<IResponse<CreateResponse>>;

   readbyId(request: ReadRequest, ctx: IRequestContext): Promise<IResponse<ReadResponse>>;

   updateById(request: UpdateRequest, ctx: IRequestContext): Promise<IResponse<unknown>>;

   deleteById(request: DeleteRequest, ctx: IRequestContext): Promise<IResponse<unknown>>;
}
