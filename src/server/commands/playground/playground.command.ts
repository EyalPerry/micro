import { Command } from "commander";
import { IAppContext } from "Server/types";

export default function definePlaygroundCommand(ctx: IAppContext, program: Command): void {
   program
      .command("playground")
      .description("run WIP code with your entire IAppContext")
      .action(() => playground(ctx));
}

async function playground(ctx: IAppContext): Promise<void> {
   console.log("do whatever you want here, it wont be run in production anyway");
}
