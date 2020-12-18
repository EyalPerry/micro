import * as yup from "yup";

export function patchable<T extends yup.AnySchema>(schema: T): T {
   return schema.when("$method", {
      is: "patch", // alternatively: (val) => val == true
      then: schema.notRequired(),
      otherwise: schema.required(),
   });
}
