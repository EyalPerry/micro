# Commands
Sometimes, developers need to run (or debug) custom scripts which perform one off operations on the service and it's environment (e.g. seeding the development database, running a migration in production or any sort of job for that manner).

It makes sense to write these functions as part of the service codebase, so that they may be debugged, developed and deployed using the same codebase, methodologies and tools as the app.

Moreover, sometimes we just need to test out an experimental piece of code- so what we usually do is force it into production flows and then remove it (hopefully).

For these purposes, the starter project introduces command support out of the box.
What's a command? it is a custom function which can be triggered via the command line interface and process any arguments passed into it.
The function receives the `IAppContext` and any argv specified arguments.

Commands are picked up automatically: any file ending with `.command.ts`, located under `src/server/commands` will be picked up and it's default export will be used to construct the command and it's behavior. 

Check out `serve.command.ts` and `seed-db.command.ts`<br/> for usage examples.
In fact, the `serve` command is the service's default command, so by specifying no cli arguments when running the build output, the service just runs that command, which in turn starts serving requests.

Note that in dev mode, The `X_APP_DEV_ARGV` environment variable controls the command line arguments passed into the service. (see the `.dev.env` file ).
When debugging some commands, it might make sense to set the `X_APP_DEV_NODE_WAIT_FOR_DEBUGGER` env variable to true so that you can catch the execution flow in time.