import * as yup from "yup";

export const database = yup.object({
   name: yup.string().required(),
});

export type DatabaseConfig = yup.Asserts<typeof database>;
