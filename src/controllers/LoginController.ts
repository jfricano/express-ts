import { Request, Response, NextFunction } from 'express';
import { controller, bodyValidator, get, use, post } from './decorators';

type TBody<K extends string | number | symbol, V> = {
  [key in K]: V;
};
interface IRequestWithBody<K extends string | number | symbol, V, T>
  extends Request<{}, T, TBody<K, V>> {}

enum KLoginBodyReq {
  Email = 'email',
  Password = 'password',
}
type LoginRequest = IRequestWithBody<KLoginBodyReq, string, string | undefined>;
type LoginResponse = Response<string | undefined>;

@controller('/auth')
class LoginController {
  @get('/login')
  // @use(logger)
  getLogin(_req: never, res: LoginResponse): void {
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
  @bodyValidator(KLoginBodyReq.Email, KLoginBodyReq.Password)
  postLogin(req: LoginRequest, res: LoginResponse) {
    const { email, password } = req.body;
    if (email === 'EHNUN' && password === 'Blueberry2022#') {
      req.session = { isLoggedIn: true };
      // res.redirect('/');
      res.status(302).send('you logged in!');
    } else res.redirect('/logout');
  }
}
