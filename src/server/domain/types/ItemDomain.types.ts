import { IResponse, IRequestContext } from "Server/types";

export interface IItemDomain {
   create(request: unknown, ctx: IRequestContext): Promise<IResponse<unknown>>;
}
