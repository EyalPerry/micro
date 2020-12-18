/* eslint-disable @typescript-eslint/ban-types */
import { DomainObjects, IRequestContext, DomainFuncRequest } from "Server/types";
import * as yup from "yup/index";

export { Schema, ValidateOptions as ValidationOptions } from "yup/index";
import { SchemaOf } from "yup";

export type SchemaFactory = <T extends object>(
   request: T,
   ctx: IRequestContext
) => yup.ObjectSchema<T>;
export type HandlerSchema<T extends object> = yup.ObjectSchema<T> | SchemaFactory | null;

export type DomainObjectSchemas<Domain extends keyof DomainObjects> = {
   [Func in keyof DomainObjects[Domain]]: SchemaOf<DomainFuncRequest<Domain, Func>>;
};

export type DomainObjectsSchemas = {
   [TDomain in keyof DomainObjects]: DomainObjectSchemas<TDomain>;
};
