import { IAppContext, JobMap } from "Server/types";
import path from "path";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context(__dirname, true, /^(.*)\.job\.ts$/);
const jobMap: JobMap = context.keys().reduce((result: JobMap, key: string) => {
   const parts = key.split(path.sep);
   const jobName = parts[parts.length - 1].replace(".job.ts", "");
   result[jobName] = context(key).default;
   return result;
}, {} as JobMap);

export async function runJob(jobName: string, ctx: IAppContext, args: unknown): Promise<void> {
   const job = jobMap[jobName];

   if (!job) {
      console.log(`no such job: ${jobName}`);
      process.exit(1);
   }

   ctx.services.logger.info("running job", jobName);
   await job(ctx, args);
}
