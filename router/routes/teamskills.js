'use strict';

module.exports = (app, db) => {

    app.get('/api/teamskills', (req, res) => {
        db.teamskill.findAll({
            attributes: ['id', 'team_id', 'skill_id']
        })
            .then(teamskill => {
                res.json(teamskill);
            });
    });
    //userskillid
    app.get('/api/teamskill/:id', (req, res) => {
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
    app.get('/api/teamskill/skill/:id', (req, res) => {
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
    app.get('/api/teamskill/team/:id', (req, res) => {
        const team_id = req.params.id;
        db.teamskill.findAll({
            attributes: ['id', 'team_id', 'skill_id'],
            where: { team_id: team_id }
        })
            .then(teamskill => {
                res.json(teamskill);
            });
    });

    app.post('/api/teamskill', (req, res) => {
        const text = req.body.text;
        db.teamskill.create({
            team_id: req.body.team_id,
            skill_id: req.body.skill_id,
        }).then(newteamskill => {
            res.json(newteamskill);
        })
    });

};
