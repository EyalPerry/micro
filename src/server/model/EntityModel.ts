import { IDatabaseConnection, IEntityModel, ModelsOptions } from "Server/types";

export class EntityModel implements IEntityModel {
   constructor(private connection: IDatabaseConnection, private options: ModelsOptions) {}
}
