const { Hospital, Score } = require('../db/models');

exports.sendHospitalScore = function(req, res) {
  const hospitalId = req.params.id;
  const score = req.query.score;
  const userid = req.query.userid;
  Score.create({
    rate: score,
    UserId: userid,
    HospitalId: hospitalId,
  }).then(() => {
    try {
      const Op = Sequelize.Op;
      Score.findAll({
        where: {
          HospitalId: hospitalId,
          createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date(new Date() - 15 * 60 * 1000),
          },
        },
      }).then(async scores => {
        const status =
          (await scores.reduce((a, b) => a.rate + b.rate, 0)) / scores.length;
        Hospital.findByPk(hospitalId).then(hospital => {
          try {
            hospital
              .update({
                status: status,
              })
              .then(() => {
                res.status(200);
                res.json(score);
              });
          } catch (e) {
            console.error(
              `Error ${e} happened after trying to update hospital status in Hospitals`
            );
          }
        });
      });
    } catch (e) {
      res.status(500);
      const message = e.message;
      console.error(
        `Error ${e} happened when trying to send a new hospital status.`
      );
      throw new Error(
        `Error ${message} happened when trying to send a new hospital status.`
      );
    }
  });
};
