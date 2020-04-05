exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESSTOKEN, (err, user) => {
      if (err) {
        res.status(403);
        return res.send('Wrong authentication credentials');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(403);
    return res.send('Not allowed');
  }
};
