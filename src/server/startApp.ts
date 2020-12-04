/* eslint-disable @typescript-eslint/no-empty-function */
import { program } from "commander";
import { startHTTPServer } from "Server/http";
import { runCommand } from "Server/commands";
import { IAppContext } from "Server/types";

export async function startApp(ctx: IAppContext): Promise<void> {
   program
      .command("serve", "starts the service", { isDefault: true })
      .action(() => startHTTPServer(ctx))
      .command("seed-db")
      .action((args) => runCommand("seed-db", ctx, args))
      .requiredOption("-d, --db <value>", "name of the database to seed")
      .option(
         "-f, --folder [value]",
         "name of folder under seed-db/collections which shall be used to seed the database",
         "dev"
      );

   await program.parseAsync(process.argv);
}
