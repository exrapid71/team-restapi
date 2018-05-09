'use strict'

module.exports = (sequelize, DataTypes) => {

var config = {
  name :'project',
  options: {
      tableName: 'project',
  },
  attributes: {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    members: DataTypes.STRING,
    wanted_skills: DataTypes.STRING,
    wanted_info: DataTypes.STRING,
    contact_mail: DataTypes.STRING
}};

const Project = sequelize.define(config.name,config.attributes, config.options);


return Project;
};