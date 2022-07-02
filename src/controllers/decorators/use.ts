import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKey } from './enums';

export default function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKey.Middleware, target, key) || [];

    middlewares.push(middleware);
    Reflect.defineMetadata(MetadataKey.Middleware, middlewares, target, key);
  };
}
