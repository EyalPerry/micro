import { object, string } from "Server/validation";
/* eslint-disable @typescript-eslint/ban-types */
import { IHttpHandler, IHttpEndpoint } from "Server/types";

const create: IHttpHandler<"item", "create"> = {
   route: "/",
   method: "post",
   domain: "item",
   func: "create",
   schema: object({
      data: object({}),
   }),
};

const readById: IHttpHandler<"item", "readbyId"> = {
   route: "/:id",
   method: "get",
   domain: "item",
   func: "readbyId",
   schema: object({
      id: string(),
   }),
};

const updateById: IHttpHandler<"item", "updateById"> = {
   route: "/:id",
   method: "patch",
   domain: "item",
   func: "updateById",
   schema: object({
      data: object({}),
      id: string(),
   }),
};

const deleteById: IHttpHandler<"item", "deleteById"> = {
   route: "/:id",
   method: "delete",
   domain: "item",
   schema: object({
      id: string(),
   }),
   func: "deleteById",
};

const endpoint: IHttpEndpoint = {
   route: "/items",
   handlers: [create, readById, updateById, deleteById],
};

export default endpoint;
