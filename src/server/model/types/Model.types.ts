/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { IItemModel, AppConfig } from "Server/types";

export type ModelsOptions = {
   config: AppConfig;
};

export interface Models {
   items: IItemModel;
}
