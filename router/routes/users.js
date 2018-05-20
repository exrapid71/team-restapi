'use strict';
var _ = require('underscore');
module.exports = (app, db) => {

  app.get('/api/users', (req, res) => {
    db.user.findAll({
      attributes: ['id', 'name', 'email', 'image_url', 'skills', 'interest_areas']
    })
      .then(user => {
        res.json(user);
      });
  });

  app.get('/api/user/:id', (req, res) => {
    const id = req.params.id;
    db.user.find({
      attributes: ['id', 'name', 'email', 'image_url', 'skills', 'interest_areas'],
      where: { id: id }
    })
      .then(user => {
        res.json(user);
      });
  });

  app.post('/api/user', (req, res) => {
    const text = req.body.text;
    db.user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image_url: req.body.image_url,
      skills: req.body.skills,
      interest_areas: req.body.interest_areas,
    })
      .then(newuser => {
        res.json(newuser);
      })
  });
  app.post('/api/user/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.user.find({
      attributes: ['id'],
      where: {
        email: email,
        password: password
      }
    })
      .then(newuser => {
        res.json(newuser);
      })
  });

  app.patch('/api/user/:id', (req, res) => {
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

  app.get('/api/user/skill/:id', (req, res) => {
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
  app.get('/api/user/findproje/:id', (req, res) => {
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
  app.get('/api/user/findprojects/:id', (req, res) => {
    const user_id = req.params.id;
    var info = [];
    var count = [];
    var data = [];
    var promises1 = [];
    var promises2 = [];
    var index;
    var index1;
    db.userskill.findAll({
      attributes: ['id', 'user_id', 'skill_id'],
      where: { user_id: user_id }
    })
      .then(userSkill => {
        return count = userSkill;
      }).then(counts => {

        for (index = 0; index <= count.length; index++) {
          var skill_id = count[index].skill_id;
          console.log("skill id " + skill_id);
          return db.projectskill.findAll({
            attributes: ['id', 'project_id', 'skill_id'],
            where: { skill_id: skill_id }
          })
            .then(project => {
              var con = project[index].project_id;
              info.push(con);
            })
            .then(smt => {
              for (index1 = 0; index1 < count.length; index1++) {
                var project_id = info[index1];
                return db.project.findAll({
                  attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
                  where: { id: project_id }
                })
                  .then(project => {
                    var con = project;
                    data.push(con);
                  });
              }
              return data;
            })
          return info;
        }
      })
      .then(projectall => {
        res.json(data);
      });
  });

  //work but dont return anything
  app.get('/api/user/findproject/:id', (req, res) => {
    const user_id = req.params.id;
    var done;
    var done1;
    var data = [];
    var info, sm;
    var tempIndex;
    return new Promise(function (resolve, reject) {
      db.userskill.findAll({
        attributes: ['id', 'user_id', 'skill_id'],
        where: { user_id: user_id }
      }).then(userSkill => {
        return userSkill;
      }).then(function (users) {
        _.after(users.length, function () {
          return users;
        })
        for (var u in users) {
          var skill_id = users[u].dataValues.skill_id;
          db.projectskill.findAll({
            attributes: ['id', 'project_id', 'skill_id'],
            where: { skill_id: skill_id }
          }).then(function (interests) {
            _.after(interests.length, function () {
              return interests;
            })
            tempIndex = 0;
            for (var v in interests) {
              var project_id = interests[v].dataValues.project_id;
              db.project.findAll({
                attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
                where: { id: project_id }
              }).then(function (interest) {
                var temp = interest[0].dataValues;
                if (tempIndex === 0) {
                  data.push(interest[0].dataValues);
                }
                return interest;
              }).then(function (project) {
                _.after(project.length, function () {
                  return project;
                })
                console.log("tempIndex " + tempIndex);
                //console.log(project);
                console.log("id" + project[0].dataValues.id);
                if (tempIndex !== 0) {
                  var tmp = 0;
                  for (var w in data) {
                    //console.log("same" + data[v].id);
                    //console.log("project " + project[0].dataValues.id + " w " + w);
                    //console.log("dataId " + data[w].id + " projectId " + project[0].dataValues.id);
                    if ((data[w].id) === project[0].dataValues.id) {
                      console.log("same " + data[w].id);
                      tmp++;
                      break;
                    }
                  }
                  if (tmp === 1) {
                    console.log("same")
                  }
                  else {
                    console.log("different " + project[0].dataValues.id);
                    data.push(project[0].dataValues);
                  }
                }

                tempIndex++;
              }).then(function (dataset) {
                resolve(data);
              });
            }
          });
        }
        resolve(data);
        info = sm;
        return info
      }).then(projectall => {
        reject();
        setTimeout(function () {
          res.json(data);
        }, 1500);
      });
    });
  });

  app.get('/api/user/findteam/:id', (req, res) => {
    const user_id = req.params.id;
    var done;
    var done1;
    var data = [];
    var info, sm;
    var tempIndex;
    return new Promise(function (resolve, reject) {
      db.userskill.findAll({
        attributes: ['id', 'user_id', 'skill_id'],
        where: { user_id: user_id }
      }).then(userSkill => {
        return userSkill;
      }).then(function (users) {
        _.after(users.length, function () {
          return users;
        })
        for (var u in users) {
          var skill_id = users[u].dataValues.skill_id;
          db.teamskill.findAll({
            attributes: ['id', 'team_id', 'skill_id'],
            where: { skill_id: skill_id }
          }).then(function (interests) {
            _.after(interests.length, function () {
              return interests;
            })
            tempIndex = 0;
            for (var v in interests) {
              var team_id = interests[v].dataValues.team_id;
              db.team.findAll({
                attributes: ['id', 'name', 'members', 'info', 'contact_mail'],
                where: { id: team_id }
              }).then(function (interest) {
                var temp = interest[0].dataValues;
                if (tempIndex === 0) {
                  data.push(interest[0].dataValues);
                }
                return interest;
              }).then(function (team) {
                _.after(team.length, function () {
                  return team;
                })
                //console.log("tempIndex " + tempIndex);
                //console.log(team);
                //console.log("id" + team[0].dataValues.id);

                if (tempIndex !== 0) {
                  var tmp = 0;
                  for (var w in data) {
                    //console.log("same" + data[v].id);
                    //console.log("team " + team[0].dataValues.id + " w " + w);
                    //console.log("dataId " + data[w].id + " teamId " + team[0].dataValues.id);
                    if ((data[w].id) === team[0].dataValues.id) {
                      console.log("same " + data[w].id);
                      tmp++;
                      break;
                    }
                  }
                  if (tmp === 1) {
                    console.log("same")
                  }
                  else {
                    console.log("different " + team[0].dataValues.id);
                    data.push(team[0].dataValues);
                  }
                }
                tempIndex++;
              }).then(function (dataset) {
                resolve(data);
              });
            }
          });
        }
        resolve(data);
        info = sm;
        return info
      }).then(projectall => {
        reject();
        setTimeout(function () {
          res.json(data);
        }, 1500);
      });
    });
  });
  
};
