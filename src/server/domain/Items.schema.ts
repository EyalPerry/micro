import * as yup from "yup";

export const item = yup.object();
const id = yup.string();

export const createRequest = yup.object({
   data: item.required(),
});

export const readRequest = yup.object({
   id: id.required(),
});

export const updateRequest = yup.object({
   id: id.required(),
   data: item.required(),
});

export const deleteRequest = yup.object({
   id: id.required(),
});

