import { Response, Request, NextFunction } from 'express';
import { controller, bodyValidator, get, post } from './decorators';
import { IRequestWithBody, RouterMiddlewareFunction } from './types';

enum KLoginBodyReq {
  Email = 'email',
  Password = 'password',
}
type LoginRequest = IRequestWithBody<KLoginBodyReq, string, string | undefined>;
type LoginResponse = Response<string | undefined>;
type LogoutRequest = IRequestWithBody<'session', string, void>;

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(_req: Request, res: LoginResponse): void {
    const { Email: email, Password: password } = KLoginBodyReq;

    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="${email}" type="${email}" />
          </div>
          <div>
          <label>Password</label>
          <input name="${password}" type="${password}" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator(KLoginBodyReq.Email, KLoginBodyReq.Password)
  postLogin(req: LoginRequest, res: Response) {
    const { email, password } = req.body;

    if (
      email === 'jason.fricano.ext@bayer.com' &&
      password === 'Blueberry2022#'
    ) {
      req.session = { isLoggedIn: true };
      res.redirect('/');
    } else res.redirect('/logout');
  }

  @get('/logout')
  getLogout(req: LogoutRequest, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
