const { Hospital, Score } = require('../db/models');
const Sequelize = require('sequelize');

exports.sendHospitalScore = function (req, res) {
  const {rate, UserId, HospitalId} = deserializeScore(req.body)

  Score.create({
    rate,
    UserId,
    HospitalId,
  }).then(score => {
    const Op = Sequelize.Op;
    Score.findAll({
      where: {
        HospitalId,
        createdAt: {
          [Op.lt]: new Date(),
          // last 15 min records
          [Op.gt]: new Date(new Date() - 15 * 60 * 1000),
        },
      },
    })
      .then(scores => {
        const readableScores = scores.map(score => score.toJSON());
        const sumScores = readableScores.reduce(
          (acc, score) => acc + score.rate,
          0
        );
        const avgScore = Math.round(sumScores / readableScores.length);

        Hospital.findByPk(HospitalId).then(hospital => {
          try {
            hospital
              .update({
                status: avgScore,
              })
              .then(() => {
                res.status(201);
                res.json(serializeScore(score));
              });
          } catch (e) {
            console.error(
              `Error ${e} happened after trying to update hospital status in Hospitals`
            );
          }
        });
      })
      .catch(e => {
        res.status(500);
        const message = e.message;
        console.error(
          `Error ${e} happened when trying to send a new hospital status.`
        );
        res.json(
          `Error happened when trying to send a new hospital status; \n  ${message}`
        );
      });
  });
};

// From Internal to API payload
function serializeScore(score) {
  return {
    hospitalId: score.HospitalId,
    userId: score.UserId,
    createdAt: score.createdAt,
    id: score.id,
    score: score.rate,
    updatedAt: score.updatedAt,
  };
}

// From API payload to Internal
function deserializeScore(score) {
  return {
    HospitalId: score.hospitalId,
    UserId: score.userId,
    rate: score.score,
  };
}