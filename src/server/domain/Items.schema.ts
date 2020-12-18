import { ObjectId } from "mongodb";
import { patchable } from "Server/validation";
import * as yup from "yup";

const objectId = () =>
   yup
      .string()
      .required()
      .transform(function (value: string): ObjectId {
         if (!ObjectId.isValid(value)) {
            throw new Error(`${value} is not a valid mongo object id`);
         }
         return new ObjectId(value);
      });

export const item = yup.object({
   name: patchable(yup.string().required()),
});

export const create = yup.object({
   data: item.required(),
});

export const readById = yup.object({
   id: objectId(),
});

export const updateById = yup.object({
   id: objectId(),
   data: item.required(),
});

export const deleteById = yup.object({
   id: objectId(),
});
