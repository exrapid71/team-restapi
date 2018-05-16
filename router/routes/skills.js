'use strict';

module.exports = (app, db) => {
  // GET all tweets
  app.get('/api/skills', (req, res) => {
    db.skill.findAll({
      attributes: ['id', 'name']
    })
      .then(skill => {
        res.json(skill);
      });
  });

  app.get('/api/skill/:id', (req, res) => {
    const id = req.params.id;
    db.skill.find({
      attributes: ['id', 'name'],
      where: { id: id }
    })
      .then(skill => {
        res.json(skill);
      });
  });
  app.post('/api/skill', (req, res) => {
    const text = req.body.text;
    db.skill.create({
        name: req.body.name
    }).then(newSkill => {
        res.json(newSkill);
    })
});
};
