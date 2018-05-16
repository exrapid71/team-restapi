'use strict';

module.exports = (app, db) => {

  app.get('/api/teams', (req, res) => {
    db.team.findAll({
      attributes: ['id', 'name', 'members', 'info', 'contact_mail']
    })
      .then(team => {
        res.json(team);
      });
  });

  app.get('/api/team/:id', (req, res) => {
    const id = req.params.id;
    db.team.find({
      attributes: ['id', 'name', 'members', 'info', 'contact_mail'],
      where: { id: id }
    })
      .then(team => {
        res.json(team);
      });
  });

  app.post('/api/team', (req, res) => {
    db.team.create({
      name: req.body.name,
      members: req.body.members,
      info: req.body.info,
      contact_mail: req.body.contact_mail
    })
      .then(newteam => {
        res.json(newteam);
      })
  });

  app.patch('/api/team/:id', (req, res) => {
    const id = req.params.id;
    db.team.find({
      where: { id: id }
    })
      .then(team => {
        return team.updateAttributes({
          name: req.body.name,
          members: req.body.members,
          info: req.body.info,
          contact_mail: req.body.contact_mail
        })
      })
      .then(updatedteam => {
        res.json(updatedteam);
      });
  });

  app.delete('/api/team/:id', (req, res) => {
    const id = req.params.id;
    db.team.destroy({
      where: { id: id }
    })
    .then(deletedTeam => {
        res.json(deletedTeam);
      });
  });

};
