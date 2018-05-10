'use strict'

const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.owners = require('../models/owners.js')(sequelize, Sequelize);
db.pets = require('../models/pets.js')(sequelize, Sequelize);
db.tweet = require('../models/tweets.js')(sequelize, Sequelize);
db.event = require('../models/events.js')(sequelize, Sequelize);
db.project = require('../models/projects.js')(sequelize, Sequelize);
db.team = require('../models/teams.js')(sequelize, Sequelize);
db.user = require('../models/users.js')(sequelize, Sequelize);
db.skill = require('../models/skills.js')(sequelize, Sequelize);
db.interest = require('../models/interests.js')(sequelize, Sequelize);
//db.userskill = require('../models/userskill.js')(sequelize, Sequelize);

//Relations
db.pets.belongsTo(db.owners);
db.owners.hasMany(db.pets);
/*
db.user.hasMany(userskill);
db.skill.hasMany(userskill);
db.userskill.belongsTo(db.user);
db.userskill.belongsTo(db.skill);
*/
module.exports = db;