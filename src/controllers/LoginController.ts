import { Request, Response, NextFunction } from 'express';
import { controller, get } from './decorators';
import { use } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('request made');
  next();
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(
    _req: Request<undefined, string, undefined>,
    res: Response<string>
  ): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
          </div>
          <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }
}
