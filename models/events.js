'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'event',
        options: {
            tableName: 'event',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: DataTypes.STRING,
            eventid: DataTypes.STRING,
            url: DataTypes.STRING,
            start: DataTypes.STRING,
            thumbnail: DataTypes.STRING,
            description: DataTypes.STRING   
        }
    };

    const Event = sequelize.define(config.name, config.attributes, config.options);


    return Event;
};