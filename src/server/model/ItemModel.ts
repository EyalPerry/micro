import { IDatabaseConnection, IItemModel, ModelsOptions } from "Server/types";

export class ItemModel implements IItemModel {
   constructor(private connection: IDatabaseConnection, private options: ModelsOptions) {}
}
