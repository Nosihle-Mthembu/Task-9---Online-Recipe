import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const SECRET_KEY = 'your_secret_key';
const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Middleware for checking authentication
server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/register', (req, res) => {
  const { email, password } = req.body;
  const token = createToken({ email });
  res.status(200).json({ token });
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get('users').find({ email }).value();
  if (user && user.password === password) {
    const token = createToken({ email });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    const token = req.headers.authorization.split(' ')[1];
    try {
      verifyToken(token);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    next();
  }
});

server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running');
});
