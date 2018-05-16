'use strict';

module.exports = (app, db) => {

  app.get('/api/tweets', (req, res) => {
    db.tweet.findAll({
      attributes: ['tweetid', 'text']
    })
      .then(tweet => {
        res.json(tweet);
      });
  });

  app.get('/api/tweet/:id', (req, res) => {
    const tweetid = req.params.id;
    db.tweet.find({
      attributes: ['tweetid', 'text'],
      where: { tweetid: tweetid }
    })
      .then(tweet => {
        res.json(tweet);
      });
  });

  app.post('/api/tweet', (req, res) => {
    const text = req.body.text;
    db.tweet.create({
      text: text
    })
      .then(newtweet => {
        res.json(newtweet);
      })
  });

  app.delete('/api/tweet/:id', (req, res) => {
    const id = req.params.id;
    db.tweets.destroy({
      where: { id: id }
    })
      .then(deletedtweet => {
        res.json(deletedtweet);
      });
  });

  //filter only one parameter
  app.get('/api/tweet', function (req, res) {
    var tweetid = req.param('id');
    var text = req.param('text');
    // let parsedQs = req.parse(parsedUrl.query);
    // console.log(req);
    // req.query /tweet? den sonra yazılan yerşeyi çekip json formatında döndürüyor
    // req.query.id  tweet?id=1 i parse edebiliyor
    // req._parsedUrl.query tweet? den sonraki queryi veriyor
    // sql injection olabilir
    console.log("tweetid " + req._parsedUrl.query);
    db.tweet.findAll({
      attributes: ['tweetid', 'text'],
      where: { tweetid: tweetid }
    })
      .then(tweet => {
        res.json(tweet);
      });
  });

};
