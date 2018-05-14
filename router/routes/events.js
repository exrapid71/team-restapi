'use strict';
var _ = require('underscore');
module.exports = (app, db) => {

  app.get('/events', (req, res) => {
    db.event.findAll({
      attributes: ['id', 'name', 'eventId', 'url', 'start', 'thumbnail', 'description']
    })
      .then(event => {
        res.json(event);
      });
  });
  app.get('/event/:id', (req, res) => {
    const id = req.params.id;
    db.event.find({
      attributes: ['id', 'name', 'eventId', 'url', 'start', 'thumbnail', 'description'],
      where: { id: id }
    })
      .then(event => {
        res.json(event);
      });
  });
  app.get('/event/team/:id', (req, res) => {
    const event_id = req.params.id;
    var data = [];
    var info, sm;
    return new Promise(function (resolve, reject) {
      db.eventteam.findAll({
        attributes: ['id', 'team_id', 'event_id'],
        where: { event_id: event_id }
      })
        .then(eventteam => {
          _.after(eventteam.length, function () {
            return eventteam;
          })
          for (var u in eventteam) {
            var team_id = eventteam[u].dataValues.team_id;
            db.team.find({
              attributes: ['id', 'name', 'members', 'info', 'contact_mail'],
              where: { id: team_id }
            }).then(function (interest) {
              console.log(interest.dataValues);
              var temp = interest.dataValues;
              data.push(interest.dataValues);
            }).then(function (dataset) {
              resolve(data);
            });
          }
          resolve(data);
          info = data;
          return info
        }).then(projectall => {
          reject();
          setTimeout(function () {
            res.json(data);
          }, 100);
        });
    });
  });
};