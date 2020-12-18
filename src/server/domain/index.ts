import { DomainObjects } from "Server/types";
import { ItemsDomain } from "./Items.domain";

export async function getDomainObjects(): Promise<DomainObjects> {
   return {
      items: new ItemsDomain(),
   };
}
