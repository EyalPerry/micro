# During Development
Configuration encouraged to be type safe (see `server/config/types`). <br/>
It is also validated at runtime (see `server/config/schema/util/validateConfig.ts`).<br/>

# During Runtime
You can control the server's configuration at runtime via the below.

## Environment

The server will load environment variables from environment files, if present:

In Development
- The `.dev.env` and `.env` files are loaded into the environment.

In CI
- The `.deployment.env` and `.env` files are loaded into the environment.

In Production
- The `.deployment.env` file will be loaded into the environment.

It will then obtain from the environment all variables prefixed with `X_APP_CONFIG__`.

### Environment Variable Naming Convention

`__` translates into `.` (object path denominator). i.e.
```
X_APP_CONFIG__HTTP__SECURE=false
```
Translates into
```json
{
  "http":{
    "secure": false
  }
}
```

`_` Serves as a camelCase word denominator. i.e.
```
X_APP_CONFIG__SERVER__MAX_ITEMS_PER_PAGE
```
Translates into
```json
{
  "server":{
    "maxItemsPerPage": false
  }
}
```

## File

The server will load configurations from a file whose path is denoted by `X_APP_VARS_CONFIG_PATH`, if the variable is specified.
Server will fail to start if the variable is specified but the file is not accessible.

### Format
If you specify the `X_APP_VARS_CONFIG_PATH` you must also specify `X_APP_VARS_CONFIG_TYPE` variable.<br/>
Supported types: `yml` / `yaml` / `json`.

In Dev mode
- The `app.config.json` file in the project directory is used by default.

## Defaults

For config values not specified in the aforementioned options, the values specified in `defaultConfig.ts` will be used.

## Precedence

The precedence of values, sorted from highest priority to lowest:
- environment
- config file
- defaults

## A note about additional format support
You can easily add additional config format support. (see `getConfigFromFile.ts`).