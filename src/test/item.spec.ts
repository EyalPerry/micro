import { HttpTestClient } from "./http-test-client";

describe("item tests", () => {
   let client: HttpTestClient;
   beforeEach(() => {
      client = new HttpTestClient({ baseUrl: "/items" });
   });
   it("should create an item", async () => {
      const response = await client.post("/", { body: { test: true, name: "hello!" } });
      expect(response.code).toEqual(201);
      const body = response.body as { id: string };
      expect(body).toHaveProperty("id");
      expect(body.id).toMatch(/a-z0-9/);
   });
});
