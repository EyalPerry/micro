import { AppConfig } from "Server/types";
import { validateConfig, resolveConfig } from "./util";

export const getConfig = async (): Promise<AppConfig> => {
   const resolved = resolveConfig();
   return validateConfig(resolved);
};
