/* eslint-disable @typescript-eslint/ban-types */
import { IHttpHandler, IHttpEndpoint } from "Server/types";

const create: IHttpHandler<"item", "create"> = {
   route: "/",
   method: "post",
   domain: "item",
   func: "create",
};

const endpoint: IHttpEndpoint = {
   route: "/item",
   handlers: [create],
};

export default endpoint;
