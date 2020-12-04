/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConfig, Schema } from "Server/types";
import { ObjectSchema } from "yup";

export type ConfigName = keyof AppConfig;
export type ConfigPartType<PartName extends ConfigName> = AppConfig[PartName];
export type ConfigScalarKeys = "environment";

export type ConfigPartFields<PartName extends ConfigName> = keyof AppConfig[PartName];

export type DefaultValueFactory<Name extends ConfigName> = () => AppConfig[Name];

export type ConfigSchemaPart<PartName extends ConfigName> = {
   [FieldName in ConfigPartFields<PartName>]: Schema<any>;
};

export type ConfigSchema = {
   [PartName in ConfigName]: ObjectSchema;
};
