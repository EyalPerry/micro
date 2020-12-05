import { program } from "commander";
import { IAppContext, CommandBuilder } from "Server/types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context(__dirname, true, /^(.*)\.command\.ts$/);
const commandBuilders: CommandBuilder[] = context.keys().map((key: string) => context(key).default);

export async function runCommand(ctx: IAppContext, argv: string[]): Promise<void> {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   commandBuilders.forEach((commandFactory) => commandFactory(ctx, program as any));
   await program.parseAsync(argv);
}
