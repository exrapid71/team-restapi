'use strict';
var _ = require('underscore');
module.exports = (app, db) => {

    app.get('/api/projectskills', (req, res) => {
        db.projectskill.findAll({
            attributes: ['id', 'project_id', 'skill_id']
        }).then(projectskill => {
            res.json(projectskill);
        });
    });
    //userskillid
    app.get('/api/projectskill/:id', (req, res) => {
        const id = req.params.id;
        db.projectskill.find({
            attributes: ['id', 'project_id', 'skill_id'],
            where: { id: id }
        }).then(projectskill => {
            res.json(projectskill);
        });
    });
    //skillid
    app.get('/api/projectskill/skill/:id', (req, res) => {
        const skill_id = req.params.id;
        db.projectskill.findAll({
            attributes: ['id', 'project_id', 'skill_id'],
            where: { skill_id: skill_id }
        }).then(projectskill => {
            res.json(projectskill);
        });
    });
    //userid
    app.get('/api/projectskill/project/:id', (req, res) => {
        const project_id = req.params.id;
        db.projectskill.findAll({
            attributes: ['id', 'project_id', 'skill_id'],
            where: { project_id: project_id }
        }).then(projectskill => {
            res.json(projectskill);
        });
    });

    app.post('/api/projectskill', (req, res) => {
        const text = req.body.text;
        db.projectskill.create({
            project_id: req.body.project_id,
            skill_id: req.body.skill_id,
        }).then(newProjectSkill => {
            res.json(newProjectSkill);
        })
    });
    app.get('/api/projectskills/project/:id', (req, res) => {
        var data = [];
        const project_id = req.params.id;
        db.projectskill.findAll({
          attributes: ['id', 'project_id', 'skill_id'],
          where: { project_id: project_id }
        }).then(projectskill => {
          return projectskill;
        }).then(function (users) {
          _.after(users.length, function () {
            return users;
          })
          for (var u in users) {
            var skill_id = users[u].dataValues.skill_id;
            db.skill.find({
              attributes: ['id', 'name'],
              where: { id: skill_id }
            }).then(skill => {
              var con = skill;
              data.push(con);
            });
          }
        }).then(projectall => {
          setTimeout(function () {
            res.json(data);
          }, 1000);
        });
      });
};
