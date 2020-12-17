/* eslint-disable @typescript-eslint/ban-types */
import { DomainObjects, IRequestContext, DomainFuncRequest } from "Server/types";
import * as yup from "yup/index";

export { Schema, ValidateOptions as ValidationOptions } from "yup/index";

export type SchemaFactory = <T extends object>(
   request: T,
   ctx: IRequestContext
) => yup.ObjectSchema<T>;
export type HandlerSchema<T extends object> = yup.ObjectSchema<T> | SchemaFactory | null;

export type DomainObjectSchemas<TDomain extends keyof DomainObjects> = {
   [TFunc in keyof DomainObjects[TDomain]]: DomainFuncRequest<TDomain, TFunc>;
};

export type DomainObjectsSchemas = {
   [TDomain in keyof DomainObjects]: DomainObjectSchemas<TDomain>;
};
