import { ObjectId } from "mongodb";
import { partialSupport as partial } from "Server/validation";
import * as yup from "yup";

//TODO figure out why this doesn't work for TS when moving it to Server/validation
const id = () =>
   yup
      .string()
      .required()
      .transform(function (value: string): string {
         if (!ObjectId.isValid(value)) {
            throw new Error(`${value} is not a valid mongo object id`);
         }
         return value;
      });

export const item = yup.object({
   name: partial(yup.string().required()),
});

export const create = yup.object({
   data: item.required(),
});

export const readById = yup.object({
   id: id(),
});

export const updateById = yup.object({
   id: id(),
   data: item.required(),
});

export const deleteById = yup.object({
   id: id(),
});
