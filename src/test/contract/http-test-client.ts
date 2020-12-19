/* eslint-disable @typescript-eslint/no-explicit-any */
import urlJoin from "url-join";
import _ from "lodash";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, Method } from "axios";

export type StringMap = { [key: string]: string };

export type HttpResponse<T> = {
   code: number;
   body: T;
   headers: StringMap;
};

export class HttpTestClient {
   private instance: AxiosInstance;

   constructor(
      private options: {
         headers?: StringMap;
         baseUrl?: string;
      }
   ) {
      const url =
         process.env.X_TEST_SERVER_URL || `http://localhost:${process.env.X_APP_PORT || "3000"}`;

      this.instance = axios.create({
         baseURL: url,
         headers: {
            "x-app-client": "test",
            "x-app-test-name": global.TEST_NAME as string,
            ...(options.headers || {}),
         },
      });
   }

   private request = async (url: string, method: Method, config: AxiosRequestConfig) => {
      try {
         const response = await this.instance.request({
            url: urlJoin(this.options.baseUrl || "", url),
            method,
            ..._.omitBy(config, _.isNil),
         });
         return _.omitBy(
            {
               code: response.status,
               headers: response.headers,
               body: response.data,
            },
            _.isNil
         ) as any;
      } catch (err) {
         const axiosErr = err as AxiosError;
         if (!axiosErr.response) {
            throw err;
         }

         return _.omitBy(
            {
               code: axiosErr.response.status,
               body: axiosErr.response.data,
               headers: axiosErr.response.headers,
            },
            _.isNil
         ) as any;
      }
   };

   get = <T>(
      url: string,
      options?: { query?: StringMap; headers?: StringMap }
   ): Promise<HttpResponse<T>> =>
      this.request(url, "get", { params: options?.query, headers: options?.headers });

   post = <T>(
      url: string,
      options: { body: unknown; headers?: StringMap }
   ): Promise<HttpResponse<T>> =>
      this.request(url, "post", { data: options?.body, headers: options?.headers });

   put = <T>(
      url: string,
      options: { body: unknown; headers?: StringMap }
   ): Promise<HttpResponse<T>> =>
      this.request(url, "put", { data: options.body, headers: options.headers });

   patch = <T>(
      url: string,
      options: { body: unknown; headers?: StringMap }
   ): Promise<HttpResponse<T>> =>
      this.request(url, "patch", { data: options.body, headers: options.headers });

   delete = <T>(url: string, options?: { headers?: StringMap }): Promise<HttpResponse<T>> =>
      this.request(url, "delete", { headers: options?.headers });
}
