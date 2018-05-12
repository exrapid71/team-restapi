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
db.tweet = require('../models/tweets.js')(sequelize, Sequelize);
db.event = require('../models/events.js')(sequelize, Sequelize);
db.project = require('../models/projects.js')(sequelize, Sequelize);
db.team = require('../models/teams.js')(sequelize, Sequelize);
db.user = require('../models/users.js')(sequelize, Sequelize);
db.skill = require('../models/skills.js')(sequelize, Sequelize);
db.interest = require('../models/interests.js')(sequelize, Sequelize);
db.userskill = require('../models/userskills.js')(sequelize, Sequelize);
db.projectskill = require('../models/projectskills.js')(sequelize, Sequelize);
db.teamskill = require('../models/teamskills.js')(sequelize, Sequelize);
//Relations
db.user.hasMany(db.userskill);
db.skill.hasMany(db.userskill);
db.userskill.belongsTo(db.user);
db.userskill.belongsTo(db.skill);

db.project.hasMany(db.projectskill);
db.skill.hasMany(db.projectskill);
db.projectskill.belongsTo(db.project);
db.projectskill.belongsTo(db.skill);

db.team.hasMany(db.teamskill);
db.skill.hasMany(db.teamskill);
db.teamskill.belongsTo(db.team);
db.teamskill.belongsTo(db.skill);

module.exports = db;