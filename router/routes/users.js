'use strict';
var _ = require('underscore');
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
  app.get('/user/find/:id', (req, res) => {
    const user_id = req.params.id;
    var done;
    var done1;
    var data = [];
    var info, sm;
    db.userskill.findAll({
      attributes: ['id', 'user_id', 'skill_id'],
      where: { user_id: user_id }
    }).then(userSkill => {
      return userSkill;
    }).then(function (users) {
      //done = 
      _.after(users.length, function () {
        //console.log("user length " + users.length);
        //console.log("user length " + users.length);
        return users;
      })
      for (var u in users) {
        //console.log("u " + u);
        //console.log("skill " + users[u].dataValues.skill_id);
        var skill_id = users[u].dataValues.skill_id;
        db.projectskill.findAll({
          attributes: ['id', 'project_id', 'skill_id'],
          where: { skill_id: skill_id }
        }).then(function (interests) {
          //console.log("interests length " + interests.length);
          //console.log("usinterestser length " + interests.length);
          //done1 = 
          _.after(interests.length, function () {
            return interests;
          })
          for (var v in interests) {
            //console.log("v " + v);
            //console.log("project " + interests[v].dataValues.project_id);
            var project_id = interests[v].dataValues.project_id;
            db.project.findAll({
              attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
              where: { id: project_id }
            }).then(function (interest) {
              //console.log("interest "+ interests[0].dataValues);
              var temp = interest[0].dataValues;
              //console.log(interest[0].dataValues);
              //console.log(temp);
              data.push(interest[0].dataValues);
              //done1();
              //console.log("temp "+ temp);
              //console.log("1. " + data);
            }).then(function (dataset) {
              //console.log(data);
            });
          }
          console.log("2. " + data);
          //res.json(data);
          //return data;
        });
        //done();
        console.log("3. " + data);
        //res.json(data);
        //return done;
      }
      console.log("4,5. " + data);
      //res.json(data);
      info = sm;
      return info
    }).then(function (datas) {
      console.log("4. " + data);
      //res.json(data);
    }).then(function (dataset) {
      console.log("5. " + data);
      res.json(data);
    })
  });
};