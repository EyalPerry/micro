import { config } from "dotenv";
import path from "path";

//this script executes before index.ts in prod mode
config({ path: path.resolve(process.cwd(), ".deployment.env") });
