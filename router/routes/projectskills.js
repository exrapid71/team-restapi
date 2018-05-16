'use strict';

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

};
