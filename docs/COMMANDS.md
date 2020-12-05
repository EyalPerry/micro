# Commands
Sometimes, developers need to run (and debug) custom scripts which perform one off operations on the service and it's environment (e.g. seeding the development database, running a migration in production or any sort of job for that manner).

It makes sense to write these functions as part of the service codebase, so that they may be debugged, developed and deployed using the same codebase, methodologies and tools as the app.

For this purpose, the starter project introduces command support out of the box.
What's a command? it is a custom function which can be triggered via the command line interface and process any arguments passed into it.
The function receives the `IAppContext` and any argv specified arguments.

Check out `serve.command.ts` and `seed-db.command.ts`<br/>.
In fact, the `serve` command is the service's default command, so by specifying no cli options when running the service, the user simply asks the service to start serving requests.
Adding new commands is easy - just add a file ending with the `.command.ts`. See existing commands for usage examples.

Note that in dev mode, The `X_APP_DEV_ARGV` environment variable controls the command line arguments passed into the service. (see the `.dev.env` file ).
When debugging some commands, it might make sense to set the `X_APP_DEV_NODE_WAIT_FOR_DEBUGGER` env variable to true.