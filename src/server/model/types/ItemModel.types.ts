// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IItemModel {
   /**
    * Persists the item and returns its id.
    * @param value item to persist
    * @returns id of persisted item
    */
   create(value: Record<string, unknown>): Promise<string>;

   /**
    * Loads the item whose id is specified from persistence
    * @param id id of item
    * @returns either the item or undefined if the item does not exist.
    */
   getById(id: string): Promise<Record<string, unknown> | null>;

   /**
    * Updates an item whose id is specified with the fields in the specified value
    * The update is implemented as a shallow override of the fields in the value argument:
    * Implementation does not recursively merge properties with the persisted item.
    * @param id id of item
    * @param value value to use
    * @returns the updated object if it exists and the operation succeeded, false otherwise
    */
   shallowUpdateById(
      id: string,
      value: Record<string, unknown>
   ): Promise<Record<string, unknown> | null>;

   /**
    * Deletes the item whose id is specified
    * @param id id of item
    * @returns true if the value exists and the operation succeeded, false otherwise
    */
   deleteById(id: string): Promise<boolean>;
}
