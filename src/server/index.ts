import { IAppContext } from "Server/types";
import { getAppContext } from "Server/getAppContext";
import { runCommand } from "Server/commands";

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

function startApp(ctx: IAppContext): Promise<void> {
   return runCommand(ctx, process.argv);
}

getAppContext().then(startApp).catch(onStartError);
