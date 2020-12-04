import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/ban-types
export function removeNil<T extends object>(value: T): Partial<T> {
   return _.omitBy<T>(value, _.isNil);
}

import deepmerge from "deepmerge";
export const deepMerge = deepmerge;
