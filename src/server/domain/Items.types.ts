import { DomainFunction } from "Server/types";
import * as yup from "yup";
import * as schemas from "./Items.schema";

export type Item = yup.Asserts<typeof schemas.item>;

export type CreateItemRequest = yup.Asserts<typeof schemas.create>;

export interface CreateItemResponse {
   id: string;
}

export type ReadItemByIdRequest = yup.Asserts<typeof schemas.readById>;

export interface ReadItemResponse {
   value: Item;
}

//TODO figure out how to apply Maybe on to the Item type only for UpdateByIdRequest
//currently, typing creates false impression that all fields are present during update.
export type UpdateItemByIdRequest = yup.Asserts<typeof schemas.updateById>;

export interface UpdateItemResponse {
   value: Item;
}

export type DeleteItemByIdRequest = yup.Asserts<typeof schemas.deleteById>;

export type IItemDomain = {
   create: DomainFunction<CreateItemRequest, CreateItemResponse>;
   readById: DomainFunction<ReadItemByIdRequest, ReadItemResponse | null>;
   updateById: DomainFunction<UpdateItemByIdRequest, UpdateItemResponse | null>;
   deleteById: DomainFunction<DeleteItemByIdRequest, unknown>;
};
