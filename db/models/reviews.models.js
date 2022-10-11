const db = require("../connection.js");

exports.fetchReviewById = (id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [id])
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No user found for user ${id}`,
        });
      } else {
        return review;
      }
    });
};
exports.updateReviewVotes = (id, votesToAdd) => {
  return this.fetchReviewById(id).then(({ votes }) => {
    const newVotes = votesToAdd + votes;
    return db
      .query(
        `UPDATE reviews SET votes = $1 WHERE review_id = $2 RETURNING *;`,
        [newVotes, id]
      )
      .then(({ rows }) => rows[0]);
  });
};
