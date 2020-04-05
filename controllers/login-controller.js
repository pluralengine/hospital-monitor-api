const { User } = require('../db/models');

exports.login = function (req, res) {
  const { username, password } = req.body;

  const user = User.findOne({ where: username }).then(user =>
    user.validPassword(password)
  );

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send('Username or password incorrect');
  }
};
