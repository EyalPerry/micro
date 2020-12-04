export enum HttpSuccess {
   Ok = 200,
   Created = 201,
   Accepted = 202,
   NonAuthoritativeInformation = 203,
   NoContent = 204,
   ResetContent = 205,
   PartialContent = 206,
   MultiStatus = 207,
   AlreadyReported = 208,
   IMUsed = 226,
}

export enum HttpRedirect {
   MultipleChoices = 300,
   MovedPermanently = 301,
   Found = 302,
   SeeOther = 303,
   NotModified = 304,
   UseProxy = 305,
   SwitchProxy = 306,
   TemporaryRedirect = 307,
   PermanentRedirect = 308,
}

export enum HttpClientError {
   BadRequest = 400,
   Unauthorized = 401,
   PaymentRequired = 402,
   Forbidden = 403,
   NotFound = 404,
   MethodNotAllowed = 405,
   NotAcceptable = 406,
   ProxyAuthenticationRequired = 407,
   RequestTimeout = 408,
   Conflict = 409,
   Gone = 410,
   LengthRequired = 411,
   PreconditionFailed = 412,
   PayloadTooLarge = 413,
   URITooLong = 414,
   UnsupportedMediaType = 415,
   RangeNotSatisfiable = 416,
   ExpectationFailed = 417,
   IAmATeaPot = 418,
   MisDirectedRequest = 421,
   UnProcessableEntity = 422,
   Locked = 423,
   FailedDependency = 424,
   TooEarly = 425,
   UpgradeRequired = 426,
   PreconditionRequired = 428,
   TooManyRequests = 429,
   RequestHeaderFieldsTooLarge = 430,
   UnavailableForLegalReasons = 451,
}

export enum HttpServerError {
   Internal = 500,
   NotImplemented = 501,
   BadGateway = 502,
   ServiceUnavailable = 503,
   GatewayTimeout = 504,
   HttpVersionNotSupported = 505,
   VariantAlsoNegotiates = 506,
   InsufficientStorage = 507,
   LoopDetected = 508,
   NotExtended = 510,
   NetworkAuthenticationRequired = 511,
}

//TODO remove respond* and unite under this value
export type HttpStatus = HttpSuccess | HttpRedirect | HttpClientError | HttpServerError | number;
