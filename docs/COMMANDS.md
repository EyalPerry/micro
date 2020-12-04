# Commands
Sometimes, developers need to run (and debug) custom scripts which perform one off operations on the service and it's environment (e.g. seeding the development database or running a migration in production).

It makes sense to write these functions as part of the service codebase, so that they may be debugged, developed and deployed using the same methodologies and tools.

For this purpose, the starter project introduces command support.
What's a command? it is a custom function which can be triggered via the command line interface.
The function receives the `IAppContext` and any argv specified arguments.

Check out `startApp` and `seed-db.command.ts`<br/>
A module which ends with `command.ts` and has a default export can be invoked using the `runCommand` function.<br/>


Note that in dev mode, The `X_APP_ARGV` environment variable controls the command line arguments passed into the service. (see `.dev.env` ).