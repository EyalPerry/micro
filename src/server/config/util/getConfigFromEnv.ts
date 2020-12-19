/* eslint-disable @typescript-eslint/ban-types */
import _ from "lodash";

export function getConfigFromEnv(): object {
   const envPrefix = "X_APP_CONFIG__".toLowerCase();
   const entries = Object.entries(process.env)
      .filter(([key]: [string, string | undefined]) => key.toLowerCase().startsWith(envPrefix))
      .map(([key, value]: [string, string | undefined]) => {
         key = key.toLowerCase().replace(envPrefix, "");
         return {
            path: key.split("__").map(_.camelCase).join("."),
            value,
         };
      });

   const result: Record<string, unknown> = {};

   if (process.env.NODE_ENV) {
      result.environment = process.env.NODE_ENV;
   }

   entries.forEach(({ path, value }) => {
      _.set(result, path, value);
   });

   return result;
}
