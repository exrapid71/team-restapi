'use strict';

module.exports = (app, db) => {

    app.get('/api/eventteams', (req, res) => {
        db.eventteam.findAll({
            attributes: ['id', 'team_id', 'event_id']
        })
            .then(eventteam => {
                res.json(eventteam);
            });
    });
    //userskillid
    app.get('/api/eventteam/:id', (req, res) => {
        const id = req.params.id;
        db.eventteam.find({
            attributes: ['id', 'team_id', 'event_id'],
            where: { id: id }
        })
            .then(eventteam => {
                res.json(eventteam);
            });
    });
    //skillid
    app.get('/api/eventteam/event/:id', (req, res) => {
        const event_id = req.params.id;
        db.eventteam.findAll({
            attributes: ['id', 'team_id', 'event_id'],
            where: { event_id: event_id }
        })
            .then(eventteam => {
                res.json(eventteam);
            });
    });
    //userid
    app.get('/api/eventteam/team/:id', (req, res) => {
        const team_id = req.params.id;
        db.eventteam.findAll({
            attributes: ['id', 'team_id', 'event_id'],
            where: { team_id: team_id }
        })
            .then(eventteam => {
                res.json(eventteam);
            });
    });

    app.post('/api/eventteam', (req, res) => {
        const text = req.body.text;
        db.eventteam.create({
            team_id: req.body.team_id,
            event_id: req.body.event_id,
        })
            .then(newEventteam => {
                res.json(newEventteam);
            })
    });
};
