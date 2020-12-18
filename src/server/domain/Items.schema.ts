import * as yup from "yup";

const item = yup.object({ name: yup.string().required() });
const id = yup.string();

export const create = yup.object({
   data: item.required(),
});

export const readById = yup.object({
   id: id.required(),
});

export const updateById = yup.object({
   id: id.required(),
   data: item.required(),
});

export const deleteById = yup.object({
   id: id.required(),
});
