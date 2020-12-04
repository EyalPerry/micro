import { IAppContext, JobMap } from "Server/types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context(__dirname, true, /^(.*)\.job\.ts$/);
const contextMapper = (contextKey: string) => context(contextKey).default;
const jobMap: JobMap = context.keys().reduce((result: JobMap, key: string) => {
   result[key] = contextMapper(key);
   return result;
}, {} as JobMap);

export async function runJob(jobName: string, ctx: IAppContext, args: unknown): Promise<void> {
   const job = jobMap[jobName];

   if (!job) {
      console.log(`no such job: ${jobName}`);
      process.exit(1);
   }

   await job(ctx, args);
}
