'use strict';

module.exports = (app, db) => {

    app.get('/userprojects', (req, res) => {
        db.userproject.findAll({
            attributes: ['id', 'user_id', 'project_id'],
        })
            .then(userproject => {
                res.json(userproject);
            });
    });
    //userskillid
    app.get('/userproject/:id', (req, res) => {
        const id = req.params.id;
        db.userproject.find({
            attributes: ['id', 'user_id', 'project_id'],
            where: { id: id }
        })
            .then(userproject => {
                res.json(userproject);
            });
    });
    //skillid
    app.get('/userproject/user/:id', (req, res) => {
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
    app.get('/userproject/project/:id', (req, res) => {
        const project_id = req.params.id;
        db.userproject.findAll({
            attributes: ['id', 'user_id', 'project_id'],
            where: { project_id: project_id }
        })
            .then(userproject => {
                res.json(userproject);
            });
    });

};