import 'reflect-metadata';
import { HttpMethod, MetadataKey } from './enums';

function routeBinder(method: HttpMethod) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
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
