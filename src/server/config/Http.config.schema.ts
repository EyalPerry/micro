import * as yup from "yup";

export const http = yup.object({
   port: yup.number().min(0).max(65535).required(),
   host: yup.string().required(),
   body: yup.object({
      jsonLimit: yup.string().min(3).required(),
      text: yup.boolean().optional(),
      urlencoded: yup.boolean().optional(),
   }).required(),
});

export type HttpConfig = yup.Asserts<typeof http>;

