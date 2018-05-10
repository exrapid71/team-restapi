'use strict';

module.exports = (app, db) => {
  // GET all tweets
  app.get('/interests', (req, res) => {
    db.interest.findAll({
      attributes: ['id', 'name']
    })
      .then(interest => {
        res.json(interest);
      });
  });

  app.get('/interest/:id', (req, res) => {
    const id = req.params.id;
    db.interest.find({
      attributes: ['id', 'name'],
      where: { id: id }
    })
      .then(interest => {
        res.json(interest);
      });
  });
};