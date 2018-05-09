'use strict';

module.exports = (app, db) => {
    // GET all tweets
    app.get('/projects', (req, res) => {
        db.project.findAll({
            attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail']
        })
            .then(project => {
                res.json(project);
            });
    });

    app.get('/project/:id', (req, res) => {
        const id = req.params.id;
        db.project.find({
            attributes: ['id', 'title', 'description', 'members', 'wanted_skills', 'wanted_info', 'contact_mail'],
            where: { id: id }
        })
            .then(project => {
                res.json(project);
            });
    });

    // POST single tweet
    app.post('/project', (req, res) => {
        //const text = req.body.text;
        db.project.create({
            title: req.body.title,
            description: req.body.description,
            members: req.body.members,
            wanted_skills: req.body.wanted_skills,
            wanted_info: req.body.wanted_info,
            contact_mail: req.body.contact_mail
        })
            .then(newproject => {
                res.json(newproject);
            })
    });


    /*
    
    app.get('/tweet/:id', (req, res) => {
      const tweetid = req.params.id;
      db.tweet.find({
        where: { tweetid: tweetid }
      })
        .then(tweet => {
          res.json(tweet);
        });
    });
  
    // POST single tweet
    app.post('/tweet', (req, res) => {
      const name = req.body.name;
      const role = req.body.role;
      db.tweets.create({
        name: name,
        role: role
      })
        .then(newtweet => {
          res.json(newtweet);
        })
    });
  
    // PATCH single tweet
    app.patch('/tweet/:id', (req, res) => {
      const id = req.params.id;
      const updates = req.body.updates;
      db.tweets.find({
        where: { id: id }
      })
        .then(tweet => {
          return tweet.updateAttributes(updates)
        })
        .then(updatedtweet => {
          res.json(updatedtweet);
        });
    });
  
    // DELETE single tweet
    app.delete('/tweet/:id', (req, res) => {
      const id = req.params.id;
      db.tweets.destroy({
        where: { id: id }
      })
        .then(deletedtweet => {
          res.json(deletedtweet);
        });
    });
    */
};