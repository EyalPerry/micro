import { generateDatabaseId } from "Test/util";
import { CreateItemResponse, ReadItemResponse, UpdateItemResponse } from "Server/types";
import { uuid } from "Server/util";
import { HttpTestClient, HttpResponse } from "./http-test-client";

describe("item contract tests", () => {
   let client: HttpTestClient;
   beforeEach(() => {
      client = new HttpTestClient({ baseUrl: "/items" });
   });

   function createItem(data: unknown): Promise<HttpResponse<CreateItemResponse>> {
      return client.post("/", {
         body: { data },
      });
   }

   function getItem(id: string): Promise<HttpResponse<ReadItemResponse>> {
      return client.get(`/${id}`);
   }

   function updateItem(id: string, data: unknown): Promise<HttpResponse<UpdateItemResponse>> {
      return client.patch(`/${id}`, {
         body: { data },
      });
   }

   function deleteItem(id: string): Promise<HttpResponse<unknown>> {
      return client.delete(`/${id}`);
   }

   it("should create an item", async () => {
      const response = await createItem({ world: "hello!" });
      expect(response.code).toEqual(201);
      expect(response.body.id).toMatch(/^[a-z0-9]+$/);
   });

   it("should retrieve a previously created item", async () => {
      const name = uuid();
      const createResponse = await createItem({ name });
      const getResponse = await getItem(createResponse.body.id);
      expect(getResponse.code).toEqual(200);
      expect(getResponse.body.value.name).toEqual(name);
   });

   it("should gracefully handle retrieving a non existing item", async () => {
      const getResponse = await getItem(generateDatabaseId());
      expect(getResponse.code).toEqual(404);
   });

   it("should update a previously created item", async () => {
      const createResponse = await createItem({ name: uuid() });
      const newName = uuid();
      const updateResponse = await updateItem(createResponse.body.id, { name: newName });
      expect(updateResponse.code).toEqual(200);
      expect(updateResponse.body.value.name).toEqual(newName);
   });

   it("should gracefully handle updating a non existing item", async () => {
      const updateResponse = await updateItem(generateDatabaseId(), { name: uuid() });
      expect(updateResponse.code).toEqual(404);
   });

   it("should delete a previously created item", async () => {
      const createResponse = await createItem({ name: uuid() });
      const deleteResponse = await deleteItem(createResponse.body.id);
      expect(deleteResponse.code).toEqual(200);
      const getResponse = await getItem(createResponse.body.id);
      expect(getResponse.code).toEqual(404);
   });

   it("should gracefully handle deleting a non existing item", async () => {
      const deleteResponse = await deleteItem(generateDatabaseId());
      expect(deleteResponse.code).toEqual(404);
   });
});
