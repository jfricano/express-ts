import { Request, Response } from 'express';

type TBody<K extends string | number | symbol, V> = {
  [key in K]: V;
};

export interface IRequestWithBody<K extends string | number | symbol, V, T>
  extends Request<{}, T, TBody<K, V>> {}

export type RouterMiddlewareFunction = (req: Request, res: Response) => void;
