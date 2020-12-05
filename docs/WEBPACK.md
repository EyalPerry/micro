# Why Webpack
Webpack is more common on the frontend, for obvious reasons. But that does not mean this tool has no use cases in a node app. Here's how the starter project uses webpack:

- Alias support: no more relative imports which make the code confusing.
- Build Pipeline: Lint, use TS to validate type constraints and finally transpile with babel to get the latest language features.  
- Single File output: It sure makes building deployables easy, doesn't it?
- require.context: dynamically compose http handlers, commands and whatever using file name patterns, at build time.