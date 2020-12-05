# Architecture
This starter aims to separate concerns which are often tightly coupled in applications: business logic, database access and communication protocols.
It does so by introducing an automatic mapping layer which handles both mapping of requests into  between domain object response and protocol, and by exposing
A domain object groups together functions which operate on an aspect of the system (which is then referred to as "the domain" of that object).
i.e. an Order object can have functions which create and update orders.

Domain objects do not use database primitives - they consume these via specialized objects (e.g. the Order Model).

Applications are often written by using a REST / GraphQL library, and more often than not, the domain is tightly coupled with the library / protocol.

This approach can have several drawbacks<br/>
- Reasoning about the domain becomes harder
- Supporting additional protocols becomes harder
- Testing the application outside the context of any protocol becomes impossible

In order to help alleviate this, this starter project encourages to only bind domain objects to protocol endpoints, moving the actual application into well defined domain objects.

## Binding Domain Objects to REST over HTTP
See `src/server/http/endpoints` folder and look into how a `*.endpoint.ts` is implemented.

The binding magic happens in the `src/server/http/middleware/rest` file, and can be easily applied to any other protocol.