import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';

const requireAuth = (
  req: Request<{}, string, void>,
  res: Response<string>,
  next: NextFunction
): void => {
  if (!req.session?.isLoggedIn) {
    res.status(403).send(`
        <div>not permitted</div>
        <a href="auth/login">login</a>
      `);
  } else return void next();
};

const template = (isLoggedIn: boolean) => `
    <div>
      <div>${isLoggedIn ? '' : 'NOT '}logged in</div>
      <a href="auth/${isLoggedIn ? 'logout' : 'login'}">
        Log${isLoggedIn ? 'out' : 'in'}
      </a>
    </div>
  `;
@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response<string>) {
    res.send(template(req.session?.isLoggedIn));
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(_req: Request, res: Response<string>) {
    res.send(`
      <div>welcome to protected route, logged-in user!</div>
      <a href="auth/logout">logout</a>
    `);
  }
}
