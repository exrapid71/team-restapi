'use strict';

module.exports = (app, db) => {
  
  app.get('/events', (req, res) => {
    db.event.findAll({
      attributes: ['name', 'id', 'url', 'start', 'thumbnail', 'eventid']
    })
      .then(event => {
        res.json(event);
      });
  });
  app.get('/event/:id', (req, res) => {
    const id = req.params.id;
    db.event.find({
      attributes: ['name', 'id', 'url', 'start', 'thumbnail', 'eventid'],
      where: { id: id }
    })
      .then(event => {
        res.json(event);
      });
  });
};