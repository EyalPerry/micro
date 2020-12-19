import * as yup from "yup";

export function partialSupport<T extends yup.AnySchema>(schema: T): T {
   return schema.when("$partial", {
      is: true, // alternatively: (val) => val == true
      then: schema.notRequired(),
      otherwise: schema.required(),
   });
}
