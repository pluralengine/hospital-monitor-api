const { User } = require('../db/models');
const jwt = require('jsonwebtoken');

exports.login = async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && user.validPassword(password)) {
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESSTOKEN
    );

    res.status(202);
    res.json({
      email: user.email,
      token: accessToken,
      role: user.role,
      name: user.name,
      id: user.id,
      hospitalId: user.HospitalId,
    });
  } else {
    res.status(403);
    res.send(`Username or password incorrect.`);
  }
};
