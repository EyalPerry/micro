import { IEndpoint } from "Server/types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context(__dirname, true, /^(.*)endpoint\.ts$/);
export default context
   .keys()
   .map((contextKey: string) => context(contextKey).default) as IEndpoint[];
