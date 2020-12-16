import { DomainObjects } from "Server/types";
import { ItemDomain } from "./ItemDomain";

export async function getDomainObjects(): Promise<DomainObjects> {
   return {
      item: new ItemDomain(),
   };
}
