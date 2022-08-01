export class BaseError extends Error {
  
  public readonly message!: string;
  public readonly status!: number;

  constructor(message: string, status: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this);
  }
}

export class ServerError extends BaseError {

  constructor(message = 'internal server error', status = 500) {
    super(message, status);
  }

}

export class BadRequestError extends BaseError {

  constructor(message = 'bad request', status = 400) {
    super(message, status);
  }

}