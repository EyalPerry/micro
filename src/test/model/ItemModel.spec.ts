import { IItemModel } from "Server/types";
import { getTestModels } from "./getTestModels";
import { uuid } from "Server/util";

describe("ItemModel tests", () => {
   let model: IItemModel;

   beforeEach(async () => {
      model = await (await getTestModels()).items;
   });

   it("should create an item and be able to later retrieve it", async () => {
      const random = uuid();
      const id = await model.create({ random });
      expect(typeof id).toEqual("string");
      expect(id.length).toBeGreaterThan(0);
      const value = await model.getById(id);
      expect(value).toHaveProperty("random", random);
   });

   it("should return null when reading a non existing item", async () => {
      const id = uuid();
      const value = await model.getById(id);
      expect(value).toBeNull();
   });

   it("should update a previously created item and return the updated value", async () => {
      const random = uuid();
      const id = await model.create({ random });
      const random2 = uuid();
      const updated = await model.shallowUpdateById(id, { random2 });
      expect(updated).toHaveProperty("random", random);
      expect(updated).toHaveProperty("random2", random2);
   });

   it("should return null when updating a non existing item", async () => {
      const random = uuid();
      const id = uuid();
      const updated = await model.shallowUpdateById(id, { random });
      expect(updated).toBeNull();
   });

   it("should delete a previously created item", async () => {
      const random = uuid();
      const id = await model.create({ random });
      expect(typeof id).toEqual("string");
      const value = await model.getById(id);
      expect(value).toHaveProperty("random", random);
      const result = await model.deleteById(id);
      expect(result).toEqual(true);
      const deletedValue = await model.getById(id);
      expect(deletedValue).toBeNull();
   });

   it("should return nil when deleting a non existing item", async () => {
      const id = uuid();
      const deleted = await model.deleteById(id);
      expect(deleted).toEqual(false);
   });
});
