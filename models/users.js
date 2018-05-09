'use strict'

module.exports = (sequelize, DataTypes) => {

var config = {
  name :'user',
  options: {
      tableName: 'user',
  },
  attributes: {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image_url: DataTypes.STRING,
    skills: DataTypes.STRING,
    interest_areas: DataTypes.STRING
}};

const User = sequelize.define(config.name,config.attributes, config.options);


return User;
};