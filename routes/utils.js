const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESSTOKEN, (error, user) => {
      if (error) {
        res.status(403);
        return res.send({ error: `${error}` });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(403);
    res.json({ error: 'Not allowed' });
  }
};
