import { Request, Response, NextFunction } from 'express';
import { BadRequestError, BaseError, ServerError } from './exceptions';
import Joi from 'joi';

const validator = (schema: Joi.Schema) => { 
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const isValid: boolean = error == null; 
    if (isValid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message: string = details.map(i => i.message).join(',');
      next(new BadRequestError(message));
    } 
  }; 
};

const responseInterceptor = (req: Request, res: Response, next: NextFunction) => {
  const json = res.json;
  res.json = body => json.call(res, {statusCode: res.statusCode, body });
  next();
};

const errorInterceptor: (err: TypeError | BaseError, req: Request, res: Response, next: NextFunction) => void = (err, req, res, next) => { 
  let error = err;
  if (!(err instanceof BaseError)) {
    error = new ServerError();
  }
  res.status((error as BaseError).status).json({error: error.message});
};

export { validator, responseInterceptor, errorInterceptor };
 
