import { IKoaBodyOptions } from "koa-body";

export interface HttpConfig {
   host: string;
   port: number;
   body: IKoaBodyOptions;
}
