import 'reflect-metadata';
import { HttpMethod, MetadataKey } from './enums';

function routeBinder(method: HttpMethod) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata(MetadataKey.Path, path, target, key);
      Reflect.defineMetadata(MetadataKey.Path, method, target, key);
    };
  };
}

export const get = routeBinder(HttpMethod.Get);
export const post = routeBinder(HttpMethod.Post);
export const put = routeBinder(HttpMethod.Put);
export const del = routeBinder(HttpMethod.Del);
export const patch = routeBinder(HttpMethod.Patch);
