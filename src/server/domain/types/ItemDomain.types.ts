import { IResponse, IRequestContext } from "Server/types";

export interface CreateRequest {
   data: unknown;
}

export interface ReadResponse {
   id: string;
}

export interface ReadRequest {
   id: string;
}

export interface ReadResponse {
   data: unknown;
}

export interface UpdateRequest {
   id: string;
   data: unknown;
}

export interface DeleteRequest {
   id: string;
}

export interface IItemDomain {
   create(request: CreateRequest, ctx: IRequestContext): Promise<IResponse<ReadResponse>>;

   readbyId(request: ReadRequest, ctx: IRequestContext): Promise<IResponse<ReadResponse>>;

   updateById(request: UpdateRequest, ctx: IRequestContext): Promise<IResponse<unknown>>;

   deleteById(request: DeleteRequest, ctx: IRequestContext): Promise<IResponse<unknown>>;
}
