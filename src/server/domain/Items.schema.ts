import { CreateRequest, DomainObjectSchemas } from "Server/types";
import * as v from "Server/validation";

import * as yup from "yup/index";
export const schema: DomainObjectSchemas<"item"> = {
   create: yup
      .object<CreateRequest>({
         data: yup.object(),
      })
      .defined(),
};
