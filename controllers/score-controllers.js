const { Hospital, Score } = require('../db/models');
const Sequelize = require('sequelize');

exports.sendHospitalScore = function(req, res) {
  const hospitalId = req.query.hospitalId;
  const score = req.query.score;
  const userid = req.query.userId;
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
      }).then(scores => {
        const readableScores = scores.map(score => score.toJSON());
        const sumScores = readableScores.reduce(
          (acc, score) => acc + score.rate,
          0
        );
        const avgScore = Math.round(sumScores / readableScores.length);
        Hospital.findByPk(hospitalId).then(hospital => {
          try {
            hospital
              .update({
                status: avgScore,
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
