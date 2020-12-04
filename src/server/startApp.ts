/* eslint-disable @typescript-eslint/no-empty-function */
import { program } from "commander";
import { startHTTPServer } from "Server/http";
import { runJob } from "Server/jobs";
import { IAppContext } from "Server/types";

export async function startApp(ctx: IAppContext): Promise<void> {
   program
      .command("serve", "start the server", { isDefault: true })
      .action(() => startHTTPServer(ctx))
      .command("seed-db", "seed the database")
      .requiredOption("-n, --name", "name of the database to seed")
      .option("-p, --path", "name of folder to use as seed data", "default")
      .action((args) => runJob("seed-db", ctx, args));

   await program.parseAsync(process.argv);
}
