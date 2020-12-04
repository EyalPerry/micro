import { IAppContext } from "Server/types";

export type Command = (ctx: IAppContext, args: unknown) => Promise<void>;
export type CommandMap = { [key: string]: Command };
