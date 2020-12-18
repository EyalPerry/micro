import { DomainFunction } from "Server/types";
import * as yup from "yup";
import * as schemas from "./Items.schema";

export type Item = yup.Asserts<typeof schemas.item>;

export type CreateRequest = yup.Asserts<typeof schemas.create>;

export interface CreateResponse {
   id: string;
}

export type ReadRequest = yup.Asserts<typeof schemas.readById>;

export interface ReadResponse {
   value: Item;
}

export type UpdateRequest = yup.Asserts<typeof schemas.updateById>;

export interface UpdateResponse {
   value: Record<string, unknown>;
}

export type DeleteRequest = yup.Asserts<typeof schemas.deleteById>;

export type IItemDomain = {
   create: DomainFunction<CreateRequest, CreateResponse>;
   readById: DomainFunction<ReadRequest, ReadResponse | null>;
   updateById: DomainFunction<UpdateRequest, UpdateResponse | null>;
   deleteById: DomainFunction<DeleteRequest, unknown>;
};
