'use strict'

module.exports = (sequelize, DataTypes) => {

var config = {
  name :'tweet',
  options: {
      tableName: 'tweet',
  },
  attributes: {
      tweetid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      text: DataTypes.STRING
}};

const Tweet = sequelize.define(config.name,config.attributes, config.options);


return Tweet;
};