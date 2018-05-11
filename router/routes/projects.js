'use strict';

module.exports = (app, db) => {
  app.get('/projects', (req, res) => {
    db.project.findAll({
      attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail']
    })
      .then(project => {
        res.json(project);
      });
  });

  app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    db.project.find({
      attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
      where: { id: id }
    })
      .then(project => {
        res.json(project);
      });
  });

  app.post('/project', (req, res) => {
    db.project.create({
      title: req.body.title,
      description: req.body.description,
      members: req.body.members,
      wanted_skills: req.body.wanted_skills,
      wanted_info: req.body.wanted_info,
      contact_mail: req.body.contact_mail
    })
      .then(newproject => {
        res.json(newproject);
      })
  });

  app.patch('/project/:id', (req, res) => {
    const id = req.params.id;
    db.project.find({
      where: { id: id }
    })
      .then(project => {
        return project.updateAttributes({
          title: req.body.title,
          description: req.body.description,
          members: req.body.members,
          wanted_skills: req.body.wanted_skills,
          wanted_info: req.body.wanted_info,
          contact_mail: req.body.contact_mail
        })
      })
      .then(updatedproject => {
        res.json(updatedproject);
      });
  });

  app.delete('/project/:id', (req, res) => {
    const id = req.params.id;
    db.project.destroy({
      where: { id: id }
    })
      .then(deletedProject => {
        res.json(deletedProject);
      });
  });

};