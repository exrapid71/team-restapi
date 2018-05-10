'use strict';

module.exports = (app, db) => {

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

  app.patch('/user/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.user.find({
      where: { id: id }
    })
      .then(user => {
        return user.updateAttributes({
          name: req.body.name,
          email: req.body.email,
          image_url: req.body.image_url,
          skills: req.body.skills,
          interest_areas: req.body.interest_areas
        })
      })
      .then(updateduser => {
        res.json(updateduser);
      });
  });

  app.get('/user/skill/:id', (req, res) => {
    const user_id = req.params.id;
    db.userskill.findAll({
      attributes: ['id', 'user_id', 'skill_id'],
      where: { user_id: user_id }
    })
      .then(userskill => {
        res.json(userskill);
      });
  });
  // dont work
  app.get('/user/findproject/:id', (req, res) => {
    const user_id = req.params.id;
    var info = [];
    db.userskill.findAll({
      attributes: ['id', 'user_id', 'skill_id'],
      where: { user_id: user_id }
    })
      .then(userskill => {
        //var ids = userskill.skill_id;
        /*
        ids.forEach(element => {
          const skill_id = element;
          db.projectskill.findAll({
            attributes: ['id', 'project_id', 'skill_id'],
            where: { skill_id: skill_id }
          })
            .then(projectskill => {
              res.json(projectskill);
            });
          id.forEach((id) => {
            console.log(size);
          });
        });
        /*
        //var count = Object.keys(userskill).length;
        Object.keys(userskill).forEach(function (k) {
          return routes.forEach((route) => {
            route(app, db);
          });
        });
        //res.json(userskill[0].skill_id);
        */

        Object.keys(userskill).forEach(function (k) {
          var skill = userskill[k].skill_id;
          info.push(skill);
          //});
        })
        var all = [];
        //res.json(info);

        Object.keys(info).forEach(function (k) {
          var skill_id = info[k];
          res.json(skill_id);
          var square = function (skill_id) {
            return (
              db.projectskill.findAll({
                attributes: ['id', 'project_id', 'skill_id'],
                where: { skill_id: skill_id }
              })
            );
          };
          //res.json(square);
          all.push(square.project_id);
        })

        //res.json(info);
        //res.json(all);
      });
    /*
    .then(info => {
      var all = [];
      //res.json(info);
      /*
      Object.keys(info).forEach(function (k) {
        var skill_id = info[k];
        var square = function (skill_id) {
          return (
            db.projectskill.findAll({
              attributes: ['id', 'project_id', 'skill_id'],
              where: { skill_id: skill_id }
            })
          );
        };
        all.push(square);
      })
      // * 
    });
    */
    //res.json(all);
  });
  //});
  /*
  var events = data.events;
  for (var i = 0; i < events.length; i++) {
    var eventInfo = [];
    eventName = events[i].name.text;
    eventId = events[i].id;
    eventUrl = events[i].url;
    eventStartdate = events[i].start.local;
    eventThumbnail = events[i].logo.url;
    eventInfo.push([
      eventName,
      eventId,
      eventUrl,
      eventStartdate,
      eventThumbnail
    ]);
    eventData.push([eventName, eventId, eventUrl, eventStartdate, eventThumbnail]);
    checkEventDatabase(eventId, eventInfo);
  }
*/
};