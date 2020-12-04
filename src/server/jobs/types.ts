import { IAppContext } from "Server/types";

export type Job = (ctx: IAppContext, args: unknown) => Promise<void>;
export type JobMap = { [key: string]: Job };
