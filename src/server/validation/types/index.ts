import { Schema } from "yup";
import { DomainObjects, IRequestContext } from "Server/types";

export { Schema, ValidateOptions as ValidationOptions } from "yup";

export type SchemaFactory = <T>(request: T, ctx: IRequestContext) => Schema<T>;
export type HandlerSchema<T> = Schema<T> | SchemaFactory | null;

export type DomainObjectSchemas<TDomain extends keyof DomainObjects> = {
   [TFunc in keyof DomainObjects[TDomain]]: HandlerSchema<Record<string, unknown>>;
};

export type AllDomainObjectSchemas = {
   [TDomain in keyof DomainObjects]: DomainObjectSchemas<TDomain>;
};
