import { startHTTPServer } from "Server/http";
import { Command } from "commander";
import { IAppContext } from "Server/types";

export default function defineServeCommand(ctx: IAppContext, program: Command): void {
   program
      .command("serve", { isDefault: true })
      .description("starts the server and listens for connections")
      .action(() => startHTTPServer(ctx));
}
