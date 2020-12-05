import { Command } from "commander";
import { IAppContext } from "Server/types";
import { seedDatabase } from "./seedDatabase";

export default function defineSeedDbCommand(ctx: IAppContext, program: Command): void {
   program
      .command("seed-db")
      .action((args) => seedDatabase(ctx, args))
      .requiredOption("-d, --db <value>", "name of the database to seed")
      .option(
         "-f, --folder [value]",
         "name of folder under seed-db/collections which shall be used to seed the database",
         "dev"
      );
}
