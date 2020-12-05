import { startHTTPServer } from "Server/http";
import { Command } from "commander";
import { IAppContext } from "Server/types";

export default function defineServeCommand(ctx: IAppContext, program: Command): void {
   program
      .command("serve", "starts serving requests", { isDefault: true })
      .action(() => startHTTPServer(ctx));
}
