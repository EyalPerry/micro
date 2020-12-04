/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoggerService {
   info: (...args: any[]) => void;
   error: (...args: any[]) => void;
   debug: (...args: any[]) => void;
}
