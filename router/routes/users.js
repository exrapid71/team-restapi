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

        db.project.findAll({
          attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
          where: { id: project_id }
        })
          .then(project => {
            res.json(project);
          });
      });
  });
  //work but return only one project
  app.get('/user/findprojects/:id', (req, res) => {
    const user_id = req.params.id;
    var info = [];
    var count = [];
    var data = [];
    var index;
    var index1;
    db.userskill.findAll({
      attributes: ['id', 'user_id', 'skill_id'],
      where: { user_id: user_id }
    })
      .then(userSkill => {
        return count = userSkill
      }).then(counts => {
        for (index = 0; index <= count.length; index++) {
          console.log("smt1");
          var skill_id = count[index].skill_id;
          console.log("skill id " + skill_id);
          console.log("index " + index);
          return db.projectskill.findAll({
            attributes: ['id', 'project_id', 'skill_id'],
            where: { skill_id: skill_id }
          })
            .then(project => {
              console.log("index " + index);
              var con = project[index].project_id;
              console.log("con " + con);
              info.push(con);
            })
            .then(smt => {
              console.log("smt3");
              for (index1 = 0; index1 < count.length; index1++) {

                console.log("smt4");
                console.log("index " + index1);
                var project_id = info[index1];
                return db.project.findAll({
                  attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
                  where: { id: project_id }
                })
                  .then(project => {
                    var con = project;
                    data.push(con);
                    console.log("index " + index);
                    console.log("index1 " + index1);
                  });
              }
              console.log("index " + index);
              console.log("index1 " + index1);
              //return data
            })
        }
        console.log("index " + index);
        console.log("index1 " + index1);
      })
      .then(projectall => {
        res.json(data);
      });
  });
  /*
  app.get('/user/find/:id', (req, res) => {
    req.tables.Client.find({
      where: { id: req.params.id },
      include: [{ model: req.tables.Project, as: 'Projects' }]
    }).success(function (client) {

      var ret = {
        id: client.id,
        name: client.name,
        projects: []
      };

      done = _.after(client.projects.length, function () {
        res.json(ret);
      });

      client.projects.forEach(function (project) {
        project.getUsers().success(function (users) {

          var u = []
          users.forEach(function (user) {
            u.push({
              id: user.id,
              name: user.name,
            });
          });

          ret.projects.push({
            id: project.id,
            name: project.name,
            users: u
          });
          done();

        });

      });

    });
  });
  */
};
