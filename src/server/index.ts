import { getAppContext } from "Server/getAppContext";
import { startApp } from "./startApp";

const onTerminate = () => {
   console.error("terminating due to SIGTERM");
   process.exit(1);
};

process.on("SIGTERM", onTerminate);

const onStartError = (error: unknown): void => {
   console.error("could not start app", error);
   process.exit(1);
};

process.on("uncaughtException", function (err) {
   console.log(err);
});

getAppContext().then(startApp).catch(onStartError);
