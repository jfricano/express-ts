import { Request, Response, NextFunction } from 'express';
import { controller, bodyValidator, get, use, post } from './decorators';

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

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === 'EHNUN' && password === 'Blueberry2022#') {
      req.session = { isLoggedIn: true };
      // res.redirect('/');
      res.status(302).send('you logged in!');
    } else res.redirect('/logout');
  }
}
