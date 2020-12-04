const environment = process.env.NODE_ENV;
const isProduction = environment === "production";

module.exports = {
   exclude: ["node_modules"],
   sourceMaps: isProduction ? false : "both",
   retainLines: !isProduction,
   ignore: isProduction ? ["src/**/*.spec.*"] : undefined,
   presets: [
      [
         "@babel/preset-env",
         {
            targets: {
               node: process.env.X_APP_NODE_VERSION,
            },
         },
      ],
      ["@babel/preset-typescript"],
   ],
   plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
   ],
};
