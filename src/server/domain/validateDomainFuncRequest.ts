import { AnySchema } from "yup";
//TODO remove when below comments are removed
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { domainSchemas } from "./Domain.schemas";

export async function validateDomainFuncRequest(
   domain: string,
   func: string,
   value: Record<string, unknown>
): Promise<unknown> {
   //TODO figure out TS debt later
   //@ts-ignore
   const domainSchema = domainSchemas[domain];
   if (!domainSchema) {
      throw new Error(`no such domain schema: ${domain}`);
   }

   //TODO figure out TS debt later
   //@ts-ignore
   const funcSchema = domainSchema[func] as AnySchema;

   if (!domainSchema) {
      throw new Error(`no such domain schema: ${domain}`);
   }

   return funcSchema.validate(value, { stripUnknown: true });
}
