/* eslint-disable @typescript-eslint/ban-types */
import { IHandler, IEndpoint } from "Server/types";

const create: IHandler<"item", "create"> = {
   route: "/",
   method: "post",
   domain: "item",
   func: "create",
};

const endpoint: IEndpoint = {
   route: "/item",
   handlers: [create],
};

export default endpoint;
