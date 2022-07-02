import { NextFunction, Request, Response, Router } from 'express';

// interface RequestWithBody<T> extends Request<{}, void, T> {}
interface UserCreds {
  email: string;
  password: string;
}

const router = Router();

router.post(
  '/login',
  (req: Request<{}, string, UserCreds>, res: Response<string>) => {
    const { email, password } = req.body;
    if (email === 'EHNUN' && password === 'Blueberry2022#') {
      req.session = { isLoggedIn: true };
      res.redirect('/');
    } else res.redirect('/logout');
  }
);

router.get('/logout', (req, res) => {
  req.session = undefined;
  res.redirect('/');
});

const template = (isLoggedIn: boolean) => `
  <div>
    <div>${isLoggedIn ? '' : 'NOT '}logged in</div>
    <a href="login">Log${isLoggedIn ? 'out' : 'in'}</a>
  </div>
`;
router.get('/', (req: Request<{}, string, void>, res: Response<string>) =>
  res.send(template(req.session?.isLoggedIn))
);

router.get('/logout', (req, res) => {
  req.session = undefined;
  res.redirect('/');
});

const requireAuth = (
  req: Request<{}, string, void>,
  res: Response<string>,
  next: NextFunction
): void => {
  if (!req.session?.isLoggedIn) {
    res.status(403).send(`
      <div>not permitted</div>
      <a href="logout">logout</a>
    `);
  } else return void next();
};
router.get(
  '/protected',
  requireAuth,
  (_req: Request, res: Response<string>) => {
    res.send(`
    <div>welcome to protected route, logged-in user!</div>
    <a href="logout">logout</a>
  `);
  }
);

export default router;
