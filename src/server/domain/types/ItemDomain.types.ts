import { IResponse, IRequestContext, DomainFunction } from "Server/types";

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

export type IItemDomain = {
   create: DomainFunction<CreateRequest, CreateResponse>;
   readbyId: DomainFunction<ReadRequest, ReadResponse | null>;
   updateById: DomainFunction<UpdateRequest, UpdateResponse | null>;
   deleteById: DomainFunction<DeleteRequest, unknown>;
};
