import { IAppContext } from "Server/types";
import { startHTTPServer } from "Server/http";
import { getAppContext } from "Server/getAppContext";

const onTerminate = () => {
   console.error("terminating due to SIGTERM");
   process.exit(1);
};

process.on("SIGTERM", onTerminate);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onStartError = (error: any): void => {
   console.error("could not start app", error);
   process.exit(1);
};

process.on("uncaughtException", function (err) {
   console.log(err);
});

const startApp = async (
   context: IAppContext
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
   await startHTTPServer(context);
};

getAppContext().then(startApp).catch(onStartError);
