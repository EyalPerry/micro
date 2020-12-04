export type ErrorResponse =
   | "unauthenticated"
   | "not-found"
   | "bad-request"
   | "unexpected"
   | "unauthorized"
   | "insufficient-subscription"
   | "not-implemented"
   | "already-exists"
   | "conflict";

export type SuccessfulResponse = "ok" | "created";
export type ResponseOutcome = ErrorResponse | SuccessfulResponse;

export interface IResponse<T> {
   outcome: ResponseOutcome;
   data?: T;
   meta?: { [key: string]: string };
}
