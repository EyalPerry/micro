import { IAppContext, DatabaseInstanceOptions } from "Server/types";
import { getServices } from "Server/services";
import { getConfig } from "Server/config";
import { getModels, connectToDatabase } from "Server/model";
import { getDomainObjects } from "Server/domain";

export async function getAppContext(): Promise<IAppContext> {
   const config = await getConfig();
   const services = await getServices({ config });
   services.logger.debug("running with config", config);

   const dbUrl = await services.secret.dbUrl;
   const dbOptions: DatabaseInstanceOptions = {
      config: config.database,
      url: dbUrl,
   };
   const dbConnection = await connectToDatabase(dbOptions);
   const models = await getModels(dbConnection, { config });
   const domain = await getDomainObjects({ config, models, services });

   const context: IAppContext = {
      config,
      services,
      models,
      domain,
      databaseConnection: dbConnection,
   };

   return context;
}
