import { DomainFunction } from "Server/types";
import * as yup from "yup";
import * as schemas from "./Items.schema";

export type Item = yup.Asserts<typeof schemas.item>;

export type CreateRequest = yup.Asserts<typeof schemas.createRequest>;

export interface CreateResponse {
   id: string;
}

export type ReadRequest = yup.Asserts<typeof schemas.readRequest>;

export interface ReadResponse {
   value: Item;
}

export type UpdateRequest = yup.Asserts<typeof schemas.updateRequest>;

export interface UpdateResponse {
   value: Record<string, unknown>;
}

export type DeleteRequest = yup.Asserts<typeof schemas.deleteRequest>;

export type IItemDomain = {
   create: DomainFunction<CreateRequest, CreateResponse>;
   readbyId: DomainFunction<ReadRequest, ReadResponse | null>;
   updateById: DomainFunction<UpdateRequest, UpdateResponse | null>;
   deleteById: DomainFunction<DeleteRequest, unknown>;
};
