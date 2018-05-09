'use strict';

module.exports = (app, db) => {
  // GET all tweets
  app.get('/teams', (req, res) => {
    db.team.findAll({
      attributes: ['id', 'name', 'members', 'info', 'contact_mail']
    })
      .then(team => {
        res.json(team);
      });
  });

  app.get('/team/:id', (req, res) => {
    const id = req.params.id;
    db.team.find({
        attributes: ['id', 'name', 'members', 'info', 'contact_mail'],
      where: { id: id }
    })
      .then(team => {
        res.json(team);
      });
  });

  // POST single tweet
  app.post('/team', (req, res) => {
    const text = req.body.text;
    db.team.create({
      name: req.body.name,
      members: req.body.members,
      info: req.body.info,
      contact_mail: req.body.contact_mail,
    })
      .then(newteam => {
        res.json(newteam);
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