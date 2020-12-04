import { IEndpoint } from "Server/types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const context = require.context(__dirname, true, /^(.*)endpoint\.ts$/);
const contextMapper = (contextKey: string) => context(contextKey).default;
export default context.keys().map(contextMapper) as IEndpoint[];
