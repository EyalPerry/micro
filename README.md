# Notable NPM scripts

## start
Starts the server in dev + watch for changes mode.<br/>
For configuration options, have a look at the `.env` and `.env.dev` files.<br/>
Re-running required when changes applied to build configuration / config files.

## stop
stops the development server and frees up associated resources

## test
runs tests against a running test environment instance

# debugging

## VSCode
Use the Attach To Container configuration.

## Server Fails to Start
When debugging server startup issues, see `X_APP_DEV_WAIT_FOR_DEBUGGER` env variable in `.dev.env`.