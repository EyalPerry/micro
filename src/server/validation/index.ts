/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, ValidationOptions } from "Server/types";
import { mixed, MixedSchema, object as yObject } from "yup";

export const oneOf = (...values: string[]): MixedSchema => mixed().oneOf(values);

export { string, number, boolean, isSchema } from "yup";

export const object = (shape: any) => yObject().shape(shape);

export function validateObject<T>(value: T, schema: Schema<T>, options: ValidationOptions): any {
   return schema.validate(value, options);
}

export const anyObject = () => yObject();

export async function validate<T>(schema: Schema<any>, value: any, options: ValidationOptions) {
   await schema.validate(value, options);
   return (await schema.cast(value)) as T;
}
