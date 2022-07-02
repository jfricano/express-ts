import 'reflect-metadata';
import Router from '../../Router';
import { HttpMethod, MetadataKey } from './enums';

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

      if (path) router[method](`${routePrefix}${path}`, routeHandler);
    }
  };
}
