'use strict';

module.exports = (app, db) => {
  // GET all tweets
  app.get('/api/interests', (req, res) => {
    db.interest.findAll({
      attributes: ['id', 'name']
    })
      .then(interest => {
        res.json(interest);
      });
  });

  app.get('/api/interest/:id', (req, res) => {
    const id = req.params.id;
    db.interest.find({
      attributes: ['id', 'name'],
      where: { id: id }
    })
      .then(interest => {
        res.json(interest);
      });
  });
  app.post('/api/interest', (req, res) => {
    const text = req.body.text;
    db.user.create({
      name: req.body.name,
    })
      .then(newInterest => {
        res.json(newInterest);
      })
  });
};
