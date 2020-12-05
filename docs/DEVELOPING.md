# Developing
This starter is all about the developer experience!
 - npm run start: starts your backend inside a docker-compose app, alongside your db of choice and whatever infra you want to add
 - Rebuild and restart on code changes? baked in.
 - Attach a debugger on a customizable port? Search for X_APP_DEV_NODE_INSPECT_PORT
 - Debugging startup issues? Search for X_APP_DEV_NODE_WAIT_FOR_DEBUGGER
 - Using VS Code? Attaching to a debugger config is baked in
 - Want to run integration tests against the service and debug the service during test runtime or the tests themselves? Sure thing.
 - Want to run a command, such as seeding your db or debugging a migration? Search for X_APP_DEV_ARGV