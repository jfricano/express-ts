import 'reflect-metadata';
import { MetadataKey } from './enums';

export function bodyValidator(...keys: string[]) {
  console.log(keys);
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKey.Validator, keys, target, key);
  };
}
