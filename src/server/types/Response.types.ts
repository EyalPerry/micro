export type ErrorResponse =
   | "unauthenticated"
   | "not-found"
   | "bad-request"
   | "unexpected-error"
   | "unauthorized"
   | "insufficient-subscription"
   | "not-implemented"
   | "already-exists"
   | "conflict";

export type SuccessfulResponse = "ok" | "created";
export type ResponseOutcome = ErrorResponse | SuccessfulResponse;

export interface IResponse<T> {
   outcome: ResponseOutcome;
   payload?: T;
   meta?: { [key: string]: string };
}
