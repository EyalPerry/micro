import { AppConfig } from "Server/types";
export { Schema } from "yup";
import { Schema } from "yup";

export { ValidateOptions as ValidationOptions } from "yup";

export type PropertySchema = Record<string, unknown>;
export type SchemaFactory = (
   config: AppConfig
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Schema<any>;

export type TypeSchema<T> = {
   [entry in keyof T]: PropertySchema;
};
