'use strict';

module.exports = (app, db) => {

    app.get('/teamskills', (req, res) => {
        db.teamskill.findAll({
            attributes: ['id', 'team_id', 'skill_id']
        })
            .then(teamskill => {
                res.json(teamskill);
            });
    });
    //userskillid
    app.get('/teamskill/:id', (req, res) => {
        const id = req.params.id;
        db.teamskill.find({
            attributes: ['id', 'team_id', 'skill_id'],
            where: { id: id }
        })
            .then(teamskill => {
                res.json(teamskill);
            });
    });
    //skillid
    app.get('/teamskill/skill/:id', (req, res) => {
        const skill_id = req.params.id;
        db.teamskill.findAll({
            attributes: ['id', 'team_id', 'skill_id'],
            where: { skill_id: skill_id }
        })
            .then(teamskill => {
                res.json(teamskill);
            });
    });
    //userid
    app.get('/teamskill/team/:id', (req, res) => {
        const team_id = req.params.id;
        db.teamskill.findAll({
            attributes: ['id', 'team_id', 'skill_id'],
            where: { team_id: team_id }
        })
            .then(teamskill => {
                res.json(teamskill);
            });
    });

    app.post('/teamskill', (req, res) => {
        const text = req.body.text;
        db.teamskill.create({
            team_id: req.body.team_id,
            skill_id: req.body.skill_id,
        }).then(newteamskill => {
            res.json(newteamskill);
        })
    });

};