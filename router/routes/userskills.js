'use strict';

module.exports = (app, db) => {

    app.get('/userskills', (req, res) => {
        db.userskill.findAll({
            attributes: ['id', 'user_id', 'skill_id']
        })
            .then(userskill => {
                res.json(userskill);
            });
    });
    //userskillid
    app.get('/userskill/:id', (req, res) => {
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
    app.get('/userskill/skill/:id', (req, res) => {
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
    app.get('/userskill/user/:id', (req, res) => {
        const user_id = req.params.id;
        db.userskill.findAll({
            attributes: ['id', 'user_id', 'skill_id'],
            where: { user_id: user_id }
        })
            .then(userskill => {
                res.json(userskill);
            });
    });

};