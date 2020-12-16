import { Db, Collection, ObjectId } from "mongodb";
import { IItemModel } from "Server/types";
import _ from "lodash";

export class ItemModel implements IItemModel {
   constructor(private db: Db) {}

   private get collection(): Collection {
      return this.db.collection("items");
   }

   async create(value: unknown): Promise<string> {
      const result = await this.collection.insertOne(value);
      return result.insertedId;
   }

   getById(id: string): Promise<unknown> {
      return this.collection.findOne({ _id: new ObjectId(id) });
   }

   async shallowUpdateById(id: string, value: unknown): Promise<boolean> {
      const result = await this.collection.updateOne({ id: new ObjectId(id) }, { $set: value });
      return result.modifiedCount === 1;
   }

   async deleteById(id: string): Promise<boolean> {
      const result = await this.collection.deleteOne({ id: new ObjectId(id) });
      return result.deletedCount === 1;
   }
}
