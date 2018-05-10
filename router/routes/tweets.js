'use strict';

module.exports = (app, db) => {

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

  app.post('/tweet', (req, res) => {
    const text = req.body.text;
    db.tweet.create({
      text: text
    })
      .then(newtweet => {
        res.json(newtweet);
      })
  });

  app.delete('/tweet/:id', (req, res) => {
    const id = req.params.id;
    db.tweets.destroy({
      where: { id: id }
    })
      .then(deletedtweet => {
        res.json(deletedtweet);
      });
  });
};