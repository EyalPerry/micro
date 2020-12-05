import { getAppContext } from "Server/getAppContext";
import { runCommand } from "Server/commands";

const onTerminate = () => {
   console.error("terminating due to SIGTERM");
   process.exit(1);
};

process.on("SIGTERM", onTerminate);
process.on("beforeExit", () => console.log("exiting process"));

const onStartError = (error: unknown): void => {
   console.error("could not start app", error);
   process.exit(1);
};

process.on("uncaughtException", function (err) {
   console.log(err);
});

getAppContext()
   .then((ctx) => runCommand(ctx, process.argv))
   .catch(onStartError);
