'use strict';

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
        })
            .then(userskill => {
                res.json(userskill);
            });
    });

    app.delete('/api/userskill/:id', (req, res) => {
        const id = req.params.id;
        db.userskill.destroy({
            where: { id: id }
        })
            .then(deletedtweet => {
                res.json(deletedtweet);
            });
    });
    app.post('/api/userskill', (req, res) => {
        const text = req.body.text;
        db.userskill.create({
            team_id: req.body.team_id,
            skill_id: req.body.skill_id,
        }).then(userskill => {
            res.json(userskill);
        })
    });
};
