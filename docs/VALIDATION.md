# Validation

While validation of requests should be commonplace in every server side app, it is often overlooked.
This is since, well, it's hard to get right. It ends up being inconsistent. Add Typescript into the mix and you now have two symbols to edit when a request changes. Ugh.

This template solves that issue, by using the amazing yup package, and some Typescript magic.
The Request for every domain func is derived from the yup validation schema you define.
Due to how the starter is implemented, whenever you define a domain function, you have to register the request schema - or compilation will fail.

By using this starter, requests are type safe, consistent and valid.<br/>
Check out `Items.schema.ts` and `Items.types.ts` as well as `Domain.schemas.ts`.