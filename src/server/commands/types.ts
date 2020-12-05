import { IAppContext } from "Server/types";
import { Command } from "commander";

export type CommandBuilder = (ctx: IAppContext, program: Command) => void;
