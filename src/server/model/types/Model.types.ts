import { IItemModel, AppConfig } from "Server/types";

export type ModelsOptions = {
   config: AppConfig;
};

export interface Models {
   items: IItemModel;
}
