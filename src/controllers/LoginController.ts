import { Request, Response, NextFunction } from 'express';
import { controller, get, bodyValidator, post } from './decorators';

type TBody<K extends string | number | symbol, V> = {
  [key in K]: V;
};
interface IRequestWithBody<K extends string | number | symbol, V, T>
  extends Request<{}, T, TBody<K, V>> {}
// interface IResponseWithBody<K extends string | number | symbol, V>
//   extends Response<TBody<K, V>> {}

enum KLoginBodyReq {
  Email = 'email',
  Password = 'password',
}
type LoginRequest = IRequestWithBody<KLoginBodyReq, string, string | undefined>;

type LoginResponse = Response<string | undefined>;

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(
    _req: Request<undefined, string, undefined>,
    res: Response<string>
  ): void {
    const { Email: email, Password: password } = KLoginBodyReq;

    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="${email}" />
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
  postLogin(req: LoginRequest, res: LoginResponse): void {
    const { email, password } = req.body;
    if (email === 'EHNUN' && password === 'Blueberry2022#') {
      req.session = { isLoggedIn: true };
      res.status(302).send("you're in!");
    } else res.status(422).send('invalid email or password');
  }
}
