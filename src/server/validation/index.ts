/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Schema, ValidationOptions } from "Server/types";
import * as yup from "yup";

export const oneOf = (...values: string[]): Schema => yup.mixed().oneOf(values);

export { string, number, boolean, isSchema } from "yup";

export const object = (shape: any) => yup.object().shape(shape);

export function validateObject<T>(value: T, schema: Schema<T>, options: ValidationOptions): any {
   return schema.validate(value, options);
}

export const anyObject = () => yup.object();

export async function validate<T>(schema: Schema<any>, value: any, options: ValidationOptions) {
   await schema.validate(value, options);
   return (await schema.cast(value)) as T;
}

export const objectId = () =>
   yup.string().transform(function (value) {
      if (!ObjectId.isValid(value)) {
         throw new Error(`${value} is not a valid mongo object id`);
      }
      return new ObjectId(value);
   });
