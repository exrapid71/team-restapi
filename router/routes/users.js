'use strict';

module.exports = (app, db) => {
  // GET all tweets
  app.get('/users', (req, res) => {
    db.user.findAll({
      attributes: ['id', 'name', 'email', 'image_url', 'skills', 'interest_areas']
    })
      .then(user => {
        res.json(user);
      });
  });

  app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    db.user.find({
      attributes: ['id', 'name', 'email', 'image_url', 'skills', 'interest_areas'],
      where: { id: id }
    })
      .then(user => {
        res.json(user);
      });
  });

  // POST single tweet
  app.post('/user', (req, res) => {
    const text = req.body.text;
    db.user.create({
      name: req.body.name,
      email: req.body.email,
      image_url: req.body.image_url,
      skills: req.body.skills,
      interest_areas: req.body.interest_areas,
    })
      .then(newuser => {
        res.json(newuser);
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