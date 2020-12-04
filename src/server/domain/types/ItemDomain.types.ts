import { IResponse, IRequest } from "Server/types";

export interface IItemDomain {
   create(request: IRequest<unknown>): Promise<IResponse<unknown>>;
}
