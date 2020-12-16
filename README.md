# What is this?
`micro` is Starter project for developing, debugging, testing and deploying a Node.js server application.
It is not particularly opinionated with regards to libraries, and is more about sane abstractions and dev experience.

# Notable NPM scripts

## start
Powered by docker-compose. <br/>
Starts the server in dev + watch for changes mode.<br/>
Also starts a database instance.<br/>

For configuration options, have a look at the `.env` and `.env.dev` files.<br/>
Re-running this script is required when changes applied to build configuration / config files.

## stop
stops the development server and frees up associated resources

## test
runs tests against the running server instance. requires the start command to be executed beforehand.

# debugging

## VSCode
Use the Attach To Container configuration.

## Server Fails to Start
When debugging server startup issues, see `X_APP_DEV_WAIT_FOR_DEBUGGER` env variable in `.dev.env`.

# Documentation
See `docs` folder (WIP)
