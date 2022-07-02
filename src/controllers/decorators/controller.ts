import 'reflect-metadata';
import Router from '../../Router';

export function controller(routePrefix: string) {
  const { router } = Router;

  return function (target: Function) {
    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);

      if (path) router.get(`${routePrefix}${path}`, routeHandler);
    }
  };
}
