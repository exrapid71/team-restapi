'use strict';

module.exports = (app, db) => {

  app.get('/users', (req, res) => {
    db.user.findAll({
      attributes: ['id', 'name', 'email', 'image_url', 'skills', 'interest_areas']
    })
      .then(user => {
        res.json(user);
      });
  });

  app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    db.user.find({
      attributes: ['id', 'name', 'email', 'image_url', 'skills', 'interest_areas'],
      where: { id: id }
    })
      .then(user => {
        res.json(user);
      });
  });

  app.post('/user', (req, res) => {
    const text = req.body.text;
    db.user.create({
      name: req.body.name,
      email: req.body.email,
      image_url: req.body.image_url,
      skills: req.body.skills,
      interest_areas: req.body.interest_areas,
    })
      .then(newuser => {
        res.json(newuser);
      })
  });

  app.patch('/user/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.user.find({
      where: { id: id }
    })
      .then(user => {
        return user.updateAttributes({
          name: req.body.name,
          email: req.body.email,
          image_url: req.body.image_url,
          skills: req.body.skills,
          interest_areas: req.body.interest_areas
        })
      })
      .then(updateduser => {
        res.json(updateduser);
      });
  });

  app.get('/user/skill/:id', (req, res) => {
    const user_id = req.params.id;
    db.userskill.findAll({
      attributes: ['id', 'user_id', 'skill_id'],
      where: { user_id: user_id }
    })
      .then(userskill => {
        res.json(userskill);
      });
  });

  // find only one project
  app.get('/user/findproject/:id', (req, res) => {
    const user_id = req.params.id;
    db.userskill.findAll({
      attributes: ['id', 'user_id', 'skill_id'],
      where: { user_id: user_id }
    })
      .then(userSkill => {
        return userSkill;
      })
      .then(skillinfo => {
        var skill_id = skillinfo[0].skill_id;
        return db.projectskill.findAll({
          attributes: ['id', 'project_id', 'skill_id'],
          where: { skill_id: skill_id }
        })
      })
      .then(project => {
        return project
      })
      .then(projectInfo => {
        var project_id = projectInfo[0].project_id;

        db.project.find({
          attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
          where: { id: project_id }

        })
          .then(project => {
            res.json(project);
          });
      });
  });
  app.get('/user/findprojects/:id', (req, res) => {
    const user_id = req.params.id;
    db.userskill.findAll({
      attributes: ['id', 'user_id', 'skill_id'],
      where: { user_id: user_id }
    })
      .then(userSkill => {
        return userSkill;
      })
      .then(skillinfo => {
        var skill_id = skillinfo[0].skill_id;
        return db.projectskill.findAll({
          attributes: ['id', 'project_id', 'skill_id'],
          where: { skill_id: skill_id }
        })
      })
      .then(project => {
        return project
      })
      .then(projectInfo => {
        var project_id = projectInfo[0].project_id;

        db.project.find({
          attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
          where: { id: project_id }

        })
          .then(project => {
            res.json(project);
          });
      });
  });

};
