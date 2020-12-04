import { IDatabaseConnection, IEntity, ModelsOptions } from "Server/types";

export class Entity implements IEntity {
   constructor(private connection: IDatabaseConnection, private options: ModelsOptions) {}
}
