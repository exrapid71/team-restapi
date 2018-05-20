'use strict';

module.exports = (app, db) => {

    app.get('/api/eventteams', (req, res) => {
        db.eventteam.findAll({
            attributes: ['id', 'team_id', 'event_id']
        }).then(eventteam => {
            res.json(eventteam);
        });
    });
    //userskillid
    app.get('/api/eventteam/:id', (req, res) => {
        const id = req.params.id;
        db.eventteam.find({
            attributes: ['id', 'team_id', 'event_id'],
            where: { id: id }
        }).then(eventteam => {
            res.json(eventteam);
        });
    });
    //skillid
    app.get('/api/eventteam/event/:id', (req, res) => {
        const event_id = req.params.id;
        db.eventteam.findAll({
            attributes: ['id', 'team_id', 'event_id'],
            where: { event_id: event_id }
        }).then(eventteam => {
            res.json(eventteam);
        });
    });
    //userid
    app.get('/api/eventteam/team/:id', (req, res) => {
        const team_id = req.params.id;
        db.eventteam.findAll({
            attributes: ['id', 'team_id', 'event_id'],
            where: { team_id: team_id }
        }).then(eventteam => {
            res.json(eventteam);
        });
    });

    app.post('/api/eventteam', (req, res) => {
        const text = req.body.text;
        db.eventteam.create({
            team_id: req.body.team_id,
            event_id: req.body.event_id,
        }).then(newEventteam => {
            res.json(newEventteam);
        })
    });
    app.get('/api/eventteams/team/:id', (req, res) => {
        const team_id = req.params.id;
        var data;
        db.eventteam.findAll({
            attributes: ['id', 'team_id', 'event_id'],
            where: { team_id: team_id }
        }).then(eventteam => {
            return eventteam;
        }).then(team => {
            var event_id = team[0].dataValues.event_id;
            console.log(event_id);
            db.event.find({
                attributes: ['id', 'name', 'eventId', 'url', 'start', 'thumbnail', 'description'],
                where: { id: event_id }
            }).then(event => {
                res.json(event);
            });
        })
    });
    app.get('/api/eventteams/event/:id', (req, res) => {
        const event_id = req.params.id;
        var data = [];
        db.eventteam.findAll({
            attributes: ['id', 'team_id', 'event_id'],
            where: { event_id: event_id }
        }).then(eventteam => {
            return eventteam;
        }).then(function (users) {
            _.after(users.length, function () {
                return users;
            })
            for (var u in users) {
                var team_id = users[u].dataValues.team_id;
                console.log(team_id);
                db.team.find({
                    attributes: ['id', 'name', 'members', 'info', 'contact_mail'],
                    where: { id: team_id }
                }).then(team => {
                    var con = team;
                    data.push(con);
                });
            }
        }).then(projectall => {
            setTimeout(function () {
                res.json(data);
            }, 1000);
        });
    });
}