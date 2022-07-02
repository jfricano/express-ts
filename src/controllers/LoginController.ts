import { Request, Response } from 'express';
import { controller, get } from './decorators';

// asdf
@controller('/auth')
class LoginController {
  @get('/login')
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
