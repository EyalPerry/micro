/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs/promises";
import YAML from "yaml";

export async function getConfigFromFile(): Promise<any> {
   if (!process.env.X_APP_VARS_CONFIG_PATH) {
      return {};
   }

   const configString = await fs.readFile(process.env.X_APP_VARS_CONFIG_PATH, {
      encoding: "utf8",
   });

   if (!process.env.X_APP_VARS_CONFIG_TYPE) {
      throw new Error("X_APP_VARS_CONFIG_PATH environment variable not specified");
   }

   switch (process.env.X_APP_VARS_CONFIG_TYPE) {
      case "yaml":
      case "yml":
         return YAML.parse(configString);
      case "json":
         return JSON.parse(configString);
      default:
         throw new Error("unsupported config type: " + process.env.X_APP_VARS_CONFIG_TYPE);
   }
}
