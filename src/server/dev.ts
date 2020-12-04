import { pickBy } from "lodash";
const predicate = (value: string | undefined, key: string) =>
   key.toLowerCase().startsWith("x_app_");

//this script executes before index.ts in dev mode
console.log("dev environment variables", pickBy(process.env, predicate));
