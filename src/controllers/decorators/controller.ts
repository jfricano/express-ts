import 'reflect-metadata';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { HttpMethod, MetadataKey } from './enums';
import Router from '../../Router';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('invalid request');
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send('invalid request');
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  const { router } = Router;

  return function (target: Function) {
    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path: string = Reflect.getMetadata(
        MetadataKey.Path,
        target.prototype,
        key
      );
      const method: HttpMethod = Reflect.getMetadata(
        MetadataKey.Method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKey.Middleware, target.prototype, key) ||
        [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKey.Validator, target.prototype, key) || [];
      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
