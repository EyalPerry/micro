import { DomainFunction } from "Server/types";
import * as yup from "yup";
import * as schemas from "./Items.schema";

export type Item = yup.Asserts<typeof schemas.item>;

export type CreateRequest = yup.Asserts<typeof schemas.create>;

export interface CreateResponse {
   id: string;
}

export type ReadByIdRequest = yup.Asserts<typeof schemas.readById>;

export interface ReadResponse {
   value: Item;
}

//TODO figure out how to apply Maybe on to the Item type only for UpdateByIdRequest
//currently, typing creates false impression that all fields are present during update.
export type UpdateByIdRequest = yup.Asserts<typeof schemas.updateById>;

export interface UpdateResponse {
   value: Item;
}

export type DeleteByIdRequest = yup.Asserts<typeof schemas.deleteById>;

export type IItemDomain = {
   create: DomainFunction<CreateRequest, CreateResponse>;
   readById: DomainFunction<ReadByIdRequest, ReadResponse | null>;
   updateById: DomainFunction<UpdateByIdRequest, UpdateResponse | null>;
   deleteById: DomainFunction<DeleteByIdRequest, unknown>;
};
