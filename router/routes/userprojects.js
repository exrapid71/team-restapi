'use strict';
var _ = require('underscore');
module.exports = (app, db) => {

    app.get('/api/userprojects', (req, res) => {
        db.userproject.findAll({
            attributes: ['id', 'user_id', 'project_id'],
        })
            .then(userproject => {
                res.json(userproject);
            });
    });
    //userskillid
    app.get('/api/userproject/:id', (req, res) => {
        const id = req.params.id;
        db.userproject.find({
            attributes: ['id', 'user_id', 'project_id'],
            where: { id: id }
        })
            .then(userproject => {
                res.json(userproject);
            });
    });
    //projectid
    app.get('/api/userproject/user/:id', (req, res) => {
        const user_id = req.params.id;
        db.userproject.findAll({
            attributes: ['id', 'user_id', 'project_id'],
            where: { user_id: user_id }
        })
            .then(userproject => {
                res.json(userproject);
            });
    });
    //userid
    app.get('/api/userproject/project/:id', (req, res) => {
        const project_id = req.params.id;
        db.userproject.findAll({
            attributes: ['id', 'user_id', 'project_id'],
            where: { project_id: project_id }
        })
            .then(userproject => {
                res.json(userproject);
            });
    });

    app.post('/api/userproject', (req, res) => {
        const text = req.body.text;
        db.userproject.create({
            user_id: req.body.user_id,
            project_id: req.body.project_id,
        }).then(userproject => {
            res.json(userproject);
        })
    });

    app.get('/api/userprojects/user/:id', (req, res) => {
        const user_id = req.params.id;
        var data = [];
        db.userproject.findAll({
            attributes: ['id', 'user_id', 'project_id'],
            where: { user_id: user_id }
        }).then(userteam => {
            //res.json(userteam);
            console.log(userteam);
            return userteam;
        }).then(function (users) {
            _.after(users.length, function () {
                return users;
            })
            for (var u in users) {
                var project_id = users[u].dataValues.project_id;
                console.log(project_id);
                db.project.find({
                    attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
                    where: { id: project_id }
                }).then(project => {
                    var con = project;
                    data.push(con);
                });
            }
        }).then(projectall => {
            setTimeout(function () {
                res.json(data);
            }, 100);
        });
    });
};
