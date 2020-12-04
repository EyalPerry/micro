const path = require("path");
const computeExternals = require("webpack-node-externals");
const rootFolder = path.join(__dirname, "src/server");
const environment = process.env.NODE_ENV;
const isProduction = environment === "production";
const isDevelopment = environment === "development";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const outputFolder = path.join(__dirname, "dist");
const plugins = [];
const entry = [];

if (isDevelopment) {
   const { CleanWebpackPlugin } = require("clean-webpack-plugin");
   const NodemonPlugin = require("nodemon-webpack-plugin");
   const DEBUG_PORT = process.env.X_APP_DEV_NODE_INSPECT_PORT;
   const HOST = process.env.X_APP_DEV_NODE_INSPECT_HOST;
   const waitForDebugger = process.env.X_APP_DEV_NODE_WAIT_FOR_DEBUGGER === "true";

   plugins.push(
      new CleanWebpackPlugin(),
      new NodemonPlugin({
         watch: outputFolder,
         nodeArgs: [`--inspect${waitForDebugger ? "-brk" : ""}=${HOST}:${DEBUG_PORT}`],
         ext: "js,json",
         delay: "1000",
         verbose: true,
         args: process.env.X_APP_ARGV ? process.env.X_APP_ARGV.split(" ") : [],
      })
   );

   entry.push(path.join(rootFolder, "dev.ts"));
} else {
   entry.push(path.join(rootFolder, "prod.ts"));
}

entry.push(path.join(rootFolder, "index.ts"));

module.exports = {
   watch: isDevelopment,
   mode: isProduction ? "production" : "development",
   devtool: isProduction ? undefined : "inline-source-map",
   entry,
   output: {
      filename: "index.js",
      path: outputFolder,
   },
   target: "node",
   resolve: {
      extensions: [".js", ".ts", ".json"],
      plugins: [new TsconfigPathsPlugin()],
   },
   module: {
      rules: [
         {
            test: /\.(ts|js)$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: "babel-loader",
                  options: require("./babel.config.js"),
               },
               {
                  loader: "ts-loader",
               },
               {
                  loader: "eslint-loader",
                  options: {
                     failOnError: isProduction,
                     failOnWarning: isProduction,
                  },
               },
            ],
         },
      ],
   },
   externals: computeExternals(),
   plugins,
   optimization: {
      noEmitOnErrors: true,
   },
};
