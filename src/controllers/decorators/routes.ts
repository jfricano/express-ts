import { NextFunction, Request, RequestHandler, Response } from 'express';
import 'reflect-metadata';
import { HttpMethod, MetadataKey } from './enums';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: HttpMethod) {
  return function (path: string) {
    //  desc type means that this is the only type of function that can be assigned to a routehandler
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKey.Path, path, target, key);
      Reflect.defineMetadata(MetadataKey.Method, method, target, key);
    };
  };
}

export const get = routeBinder(HttpMethod.Get);
export const post = routeBinder(HttpMethod.Post);
export const put = routeBinder(HttpMethod.Put);
export const del = routeBinder(HttpMethod.Delete);
export const patch = routeBinder(HttpMethod.Patch);
