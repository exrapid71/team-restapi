'use strict';

module.exports = (app, db) => {
  // GET all tweets
  app.get('/tweets', (req, res) => {
    db.tweet.findAll({
      attributes: ['tweetid', 'text']
    })
      .then(tweet => {
        res.json(tweet);
      });
  });

  app.get('/tweet/:id', (req, res) => {
    const tweetid = req.params.id;
    db.tweet.find({
      attributes: ['tweetid', 'text'],
      where: { tweetid: tweetid }
    })
      .then(tweet => {
        res.json(tweet);
      });
  });

  // POST single tweet
  app.post('/tweet', (req, res) => {
    const text = req.body.text;
    db.tweet.create({
      text: text
    })
      .then(newtweet => {
        res.json(newtweet);
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