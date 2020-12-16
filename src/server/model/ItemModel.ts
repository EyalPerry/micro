import { Db, Collection } from "mongodb";
import { IItemModel } from "Server/types";
import _ from "lodash";
import { uuid } from "Server/util";

export class ItemModel implements IItemModel {
   constructor(private db: Db) {}

   private get collection(): Collection {
      return this.db.collection("items");
   }

   async create(value: Record<string, unknown>): Promise<string> {
      const result = await this.collection.insertOne({ ...value, _id: uuid() });
      return result.insertedId;
   }

   getById(id: string): Promise<Record<string, unknown> | null> {
      return this.collection.findOne({ _id: id }, { projection: { _id: 0 } });
   }

   async shallowUpdateById(id: string, value: unknown): Promise<Record<string, unknown> | null> {
      const result = await this.collection.findOneAndUpdate(
         { _id: id },
         { $set: value },
         { returnOriginal: false, projection: { _id: 0 } }
      );
      return result.value;
   }

   async deleteById(id: string): Promise<boolean> {
      const result = await this.collection.deleteOne({ _id: id });
      return result.deletedCount === 1;
   }
}
