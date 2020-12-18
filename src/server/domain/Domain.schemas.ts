import { DomainFuncRequestSchemas } from "Server/types";
import * as item from "./Items.schema";

export const schemas: DomainFuncRequestSchemas = {
   item: {
      create: item.createRequest,
      readbyId: item.readRequest,
      updateById: item.updateRequest,
      deleteById: item.deleteRequest,
   },
};
