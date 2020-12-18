# Architecture
This starter aims to separate concerns which are often tightly coupled in applications: domain logic, database access and communication protocols.

Coupling these concerns can make the following a lot harder<br/>
- Reasoning about the domain
- Supporting additional protocols
- Testing the application outside the context of any protocol
- Switching HTTP libraries
- Switching databases libraries / engines / versions

In order to facilitate separation, this starter acknowledges the following key aspects of an application:

- Domain Object: a class which contains any number of related functions.<br/>
Each such function may or may not be exposed for invocation as a result of an incoming request.<br/>
Each such function may invoke other domain functions.<br/>
The application can define as many domain objects as necessary.<br/>

- Model: a class which encapsulates DB primitives and concerns, whose functions speak only in domain terms.<br/>
Can be consumed by domain objects.<br/>
The application can define as many models as necessary.<br/>
A model can span multiple collections / tables and abstracts entities in a manner which makes sense to an application.
It encapsulates storage and atomicity concerns, such as transactions.

- Service: represents a cross cutting concern, such as Logging, Secret management or Static Asset I/O.<br/>
Can be consumed by both models and domain objects.<br/>
The application can define as many services as necessary.<br/>

- Configuration: an object with data, originating from the environment, the file system and default values.
Validated at runtime. <br/>
Can be consumed by domain objects, models and services.<br/>
See `CONFIG.md` for more info.

All of these are aggregated into a single object of the `IAppContext` type. It is constructed in the `getAppContext` method and later provided to the service runtime.

# Expressive HTTP Request / Response Mapping
This starter enables expressively mapping incoming requests into a single object, invoking a specific domain object function with that single object as the first argument, and pass in the `IRequestContext` as a second argument. The function's result is then converted into a response, according to the expected `IResponse` interface.

## Request validation

While validation of requests should be commonplace in every server side app, it is often overlooked.
Add Typescript into the mix and you now have two symbols to edit when a request shape changes. Ugh.
It just ends up being inconsistent and misused or plain disregarded.

This template solves that issue, by using the amazing yup package, and some Typescript magic.
By convention, the Request type for every domain func is derived from the yup validation schema you define.
Due to how the starter is implemented, whenever you define a domain function, you have to register the request schema - or compilation will fail.
(Search for `DomainFuncRequestSchemas` in `Domain.types.ts`).

By using this starter, requests are type safe, consistent and valid.<br/>
Check out `Items.schema.ts` and `Items.types.ts` as well as `Domain.schemas.ts`.

## Binding Domain Objects to REST over HTTP

HTTP endpoint files are picked up dynamically, by naming convention & folder location:
Any file located under `src/server/http/endpoints` whose postfix is `endpoint.ts` is picked up and it's default export is processed.
See the `IHttpEndpoint` and `IHttpHandler` interfaces and `item.endpoint.ts` module for usage examples.

The binding magic happens in the `src/server/http/middleware/rest` file, and can be easily applied to any other protocol.