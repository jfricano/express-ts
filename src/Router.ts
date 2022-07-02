import { Router as ExpressRouter } from 'express';

export default class AppRouter {
  private static instance: ExpressRouter;

  static get router(): ExpressRouter {
    if (!AppRouter.instance) AppRouter.instance = ExpressRouter();
    return AppRouter.instance;
  }
}
