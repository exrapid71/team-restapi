'use strict';

module.exports = (app, db) => {

    app.get('/api/userteams', (req, res) => {
        db.userteam.findAll({
            attributes: ['id', 'user_id', 'team_id'],
        })
            .then(userteam => {
                res.json(userteam);
            });
    });
    //userskillid
    app.get('/api/userteam/:id', (req, res) => {
        const id = req.params.id;
        db.userteam.find({
            attributes: ['id', 'user_id', 'team_id'],
            where: { id: id }
        })
            .then(userteam => {
                res.json(userteam);
            });
    });
    //skillid
    app.get('/api/userteam/user/:id', (req, res) => {
        const user_id = req.params.id;
        db.userteam.findAll({
            attributes: ['id', 'user_id', 'team_id'],
            where: { user_id: user_id }
        })
            .then(userteam => {
                res.json(userteam);
            });
    });
    //userid
    app.get('/api/userteam/team/:id', (req, res) => {
        const team_id = req.params.id;
        db.userteam.findAll({
            attributes: ['id', 'user_id', 'team_id'],
            where: { team_id: team_id }
        })
            .then(userteam => {
                res.json(userteam);
            });
    });
    app.post('/api/userteam', (req, res) => {
        const text = req.body.text;
        db.userteam.create({
            user_id: req.body.user_id,
            team_id: req.body.team_id,
        }).then(userteam => {
            res.json(userteam);
        })
    });

};
