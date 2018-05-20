'use strict';
var _ = require('underscore');
module.exports = (app, db) => {

    app.get('/api/userskills', (req, res) => {
        db.userskill.findAll({
            attributes: ['id', 'user_id', 'skill_id']
        })
            .then(userskill => {
                res.json(userskill);
            });
    });
    //userskillid
    app.get('/api/userskill/:id', (req, res) => {
        const id = req.params.id;
        db.userskill.find({
            attributes: ['id', 'user_id', 'skill_id'],
            where: { id: id }
        })
            .then(userskill => {
                res.json(userskill);
            });
    });
    //skillid
    app.get('/api/userskill/skill/:id', (req, res) => {
        const skill_id = req.params.id;
        db.userskill.findAll({
            attributes: ['id', 'user_id', 'skill_id'],
            where: { skill_id: skill_id }
        })
            .then(userskill => {
                res.json(userskill);
            });
    });
    //userid
    app.get('/api/userskill/user/:id', (req, res) => {
        const user_id = req.params.id;
        db.userskill.findAll({
            attributes: ['id', 'user_id', 'skill_id'],
            where: { user_id: user_id }
        }).then(userskill => {
                res.json(userskill);
          });
    });

    app.delete('/api/userskill/:id', (req, res) => {
        const id = req.params.id;
        db.userskill.destroy({
            where: { id: id }
        }).then(deletedtweet => {
                res.json(deletedtweet);
            });
    });
    app.post('/api/userskill/:id', (req, res) => {
        const text = req.body.text;
        const user_id = req.params.id;
        db.userskill.create({
            user_id: user_id,
            skill_id: req.body.skill_id,
        }).then(userskill => {
            res.json(userskill);
        })
    });
    app.get('/api/userskills/user/:id', (req, res) => {
        const user_id = req.params.id;
        var data = [];
        db.userskill.findAll({
            attributes: ['id', 'user_id', 'skill_id'],
            where: { user_id: user_id }
        }).then(userskill => {
                return userskill;
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
