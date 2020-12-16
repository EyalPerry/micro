import { CreateResponse, ReadResponse, UpdateResponse } from "Server/types";
import { uuid } from "Server/util";
import { HttpTestClient, HttpResponse } from "./http-test-client";

describe("item tests", () => {
   let client: HttpTestClient;
   beforeEach(() => {
      client = new HttpTestClient({ baseUrl: "/items" });
   });

   function createItem(data: Record<string, unknown>): Promise<HttpResponse> {
      return client.post("/", {
         body: { data },
      });
   }

   function getItem(id: string): Promise<HttpResponse> {
      return client.get(`/${id}`);
   }

   function updateItem(id: string, data: Record<string, unknown>): Promise<HttpResponse> {
      return client.patch(`/${id}`, {
         body: { data },
      });
   }

   it("should create an item", async () => {
      const response = await createItem({ world: "hello!" });
      expect(response.code).toEqual(201);
      const body = response.body as CreateResponse;
      expect(body).toHaveProperty("id");
      expect(body.id).toMatch(/[a-z0-9]+/);
   });

   it("should retrieve a previously created item", async () => {
      const random = uuid();
      const createResponse = await createItem({ random });
      const createResponseBody = createResponse.body as CreateResponse;
      const getResponse = await getItem(createResponseBody.id);
      expect(getResponse.code).toEqual(200);
      const getResponseBody = getResponse.body as ReadResponse;
      expect(getResponseBody).toHaveProperty("value.random", random);
   });

   it("gracefully handle retrieving an item with an unkown id", async () => {
      throw new Error("not implemented");
   });

   it("should update a previously created item", async () => {
      const random = uuid();
      const createResponse = await createItem({ random });
      const createResponseBody = createResponse.body as CreateResponse;
      const random2 = uuid();
      const updateResponse = await updateItem(createResponseBody.id, { random2 });
      expect(updateResponse.code).toEqual(200);
      const updateResponseBody = updateResponse.body as UpdateResponse;
      expect(updateResponseBody).toHaveProperty("value.random", random);
      expect(updateResponseBody).toHaveProperty("value.random2", random2);
   });
});
