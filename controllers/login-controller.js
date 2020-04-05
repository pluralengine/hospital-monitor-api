const { User } = require('../db/models');

exports.login = function (req, res) {
  const { username, password } = req.body;

  const user = User.findOne({ where: username }).then(user => {
    try {
      user.validPassword(password);
    } catch (error) {
      res.send(`Username or password incorrect. Error ${error}`);
    }
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESSTOKEN
    );
    res.json({
      accessToken,
    });
  }
};
