import { Db, Collection, ObjectId } from "mongodb";
import { IItemModel, Item } from "Server/types";
import _ from "lodash";

export class ItemModel implements IItemModel {
   constructor(private db: Db) {}

   private get collection(): Collection {
      return this.db.collection("items");
   }

   async create(value: Item): Promise<string> {
      const result = await this.collection.insertOne({ ...value });
      return result.insertedId;
   }

   getById(id: string): Promise<Item | null> {
      return this.collection.findOne({ _id: new ObjectId(id) }, { projection: { _id: 0 } });
   }

   async shallowUpdateById(id: string, value: Partial<Item>): Promise<Item | null> {
      const result = await this.collection.findOneAndUpdate(
         { _id: new ObjectId(id) },
         { $set: value },
         { returnOriginal: false, projection: { _id: 0 } }
      );
      return result.value;
   }

   async deleteById(id: string): Promise<boolean> {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
   }
}
