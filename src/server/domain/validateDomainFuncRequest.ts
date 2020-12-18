import { AnySchema } from "yup";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { domainSchemas } from "./Domain.schemas";

export async function validateDomainFuncRequest(
   domain: string,
   func: string,
   value: Record<string, unknown>
): Promise<unknown> {
   //@ts-ignore
   const domainSchema = domainSchemas[domain];
   if (!domainSchema) {
      throw new Error(`no such domain schema: ${domain}`);
   }

   //@ts-ignore
   const funcSchema = domainSchema[func] as AnySchema;

   if (!domainSchema) {
      throw new Error(`no such domain schema: ${domain}`);
   }

   return funcSchema.validate(value, { stripUnknown: true });
}
