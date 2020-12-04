import { IAppContext, CommandMap } from "Server/types";
import path from "path";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context(__dirname, true, /^(.*)\.command\.ts$/);
const commandMap: CommandMap = context.keys().reduce((result: CommandMap, key: string) => {
   const parts = key.split(path.sep);
   const jobName = parts[parts.length - 1].replace(".command.ts", "");
   result[jobName] = context(key).default;
   return result;
}, {} as CommandMap);

export async function runCommand(
   commandName: string,
   ctx: IAppContext,
   args: unknown
): Promise<void> {
   const command = commandMap[commandName];

   if (!command) {
      console.log(`no such command: ${commandName}`);
      process.exit(1);
   }

   ctx.services.logger.info("running command", commandName);
   await command(ctx, args);
}
