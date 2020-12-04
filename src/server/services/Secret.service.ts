import { ISecretService, ServiceDefinition, ServiceContext } from "Server/types";

//TODO use proxy + convention instead of getters
export class SecretService implements ISecretService {
   constructor(private context: ServiceContext) {}

   private getValue = async (key: string): Promise<string> => {
      const result = process.env[key];

      if (!result) {
         throw new Error(`variable ${key} was not set`);
      }

      return result;
   };

   get dbUrl(): Promise<string> {
      return this.getValue("X_APP_VARS_DB_URL");
   }
}

export const definition: ServiceDefinition<"secret"> = {
   name: "secret",
   factory: (options) => new SecretService(options),
};
