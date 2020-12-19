import { IItemModel } from "Server/types";
import { TestModels, getTestModels } from "./getTestModels";
import { uuid } from "Server/util";
import { generateDatabaseId } from "Test/util";

describe("ItemModel tests", () => {
   let testModels: TestModels;
   let model: IItemModel;

   beforeEach(async () => {
      testModels = await getTestModels();
      model = testModels.models.items;
   });

   afterEach(() => testModels.afterEach());

   it("should create an item and be able to later retrieve it", async () => {
      const name = uuid();
      const id = await model.create({ name });
      expect(typeof id).toEqual("string");
      expect(id.length).toBeGreaterThan(0);
      const value = await model.getById(id);
      expect(value).toHaveProperty("name", name);
   });

   it("should return null when reading a non existing item", async () => {
      const value = await model.getById(generateDatabaseId());
      expect(value).toBeNull();
   });

   it("should update a previously created item and return the updated value", async () => {
      const name = uuid();
      const id = await model.create({ name });
      const newName = uuid();
      const updated = await model.shallowUpdateById(id, { name: newName });
      expect(updated).toHaveProperty("name", newName);
   });

   it("should return null when updating a non existing item", async () => {
      const updated = await model.shallowUpdateById(generateDatabaseId(), { name: uuid() });
      expect(updated).toBeNull();
   });

   it("should delete a previously created item", async () => {
      const id = await model.create({ name: uuid() });
      const result = await model.deleteById(id);
      expect(result).toEqual(true);
      const deletedValue = await model.getById(id);
      expect(deletedValue).toBeNull();
   });

   it("should return nil when deleting a non existing item", async () => {
      const deleted = await model.deleteById(generateDatabaseId());
      expect(deleted).toEqual(false);
   });
});
