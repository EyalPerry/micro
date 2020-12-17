import { DomainObjects } from "Server/types";
import { ItemDomain } from "./Items.domain";

export async function getDomainObjects(): Promise<DomainObjects> {
   return {
      item: new ItemDomain(),
   };
}
