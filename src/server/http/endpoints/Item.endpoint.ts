import { IHttpHandler, IHttpEndpoint } from "Server/types";

const create: IHttpHandler<"items", "create"> = {
   route: "/",
   method: "post",
   domain: "items",
   func: "create",
};

const readById: IHttpHandler<"items", "readById"> = {
   route: "/:id",
   method: "get",
   domain: "items",
   func: "readById",
};

const updateById: IHttpHandler<"items", "updateById"> = {
   route: "/:id",
   method: "patch",
   domain: "items",
   func: "updateById",
};

const deleteById: IHttpHandler<"items", "deleteById"> = {
   route: "/:id",
   method: "delete",
   domain: "items",
   func: "deleteById",
};

const endpoint: IHttpEndpoint = {
   route: "/items",
   handlers: [create, readById, updateById, deleteById],
};

export default endpoint;
