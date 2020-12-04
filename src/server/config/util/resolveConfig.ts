/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultConfig } from "./defaultConfig";
import { getConfigFromEnv } from "./getConfigFromEnv";
import { getConfigFromFile } from "./getConfigFromFile";
import { deepMerge } from "Server/util";

export function resolveConfig(): any {
   const fromEnv = getConfigFromEnv();
   const fromFile = getConfigFromFile();

   //specified highest to lowest, easier to reason about
   const precedence = [fromEnv, fromFile, defaultConfig];

   let result = {};
   for (const value of precedence.reverse()) {
      result = deepMerge(result, value);
   }

   return result;
}
