import { ObjectId } from "mongodb";

export function generateDatabaseId(): string {
   return ObjectId.createFromTime(new Date().getSeconds()).toHexString();
}
