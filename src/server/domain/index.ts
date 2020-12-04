import { DomainObjects, DomainOptions } from "Server/types";
import { ItemDomain } from "./ItemDomain";

export async function getDomainObjects(options: DomainOptions): Promise<DomainObjects> {
   return {
      item: new ItemDomain(options),
   };
}
