/* eslint-disable @typescript-eslint/ban-types */
import { IHttpHandler, IHttpEndpoint } from "Server/types";

const create: IHttpHandler<"item", "create"> = {
   route: "/",
   method: "post",
   domain: "item",
   func: "create",
};

const readById: IHttpHandler<"item", "readbyId"> = {
   route: "/:id",
   method: "get",
   domain: "item",
   func: "readbyId",
};

const updateById: IHttpHandler<"item", "updateById"> = {
   route: "/:id",
   method: "patch",
   domain: "item",
   func: "updateById",
};

const deleteById: IHttpHandler<"item", "deleteById"> = {
   route: "/:id",
   method: "delete",
   domain: "item",
   func: "deleteById",
};

const endpoint: IHttpEndpoint = {
   route: "/items",
   handlers: [create, readById, updateById, deleteById],
};

export default endpoint;
