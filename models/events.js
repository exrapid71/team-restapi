'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'event',
        options: {
            tableName: 'event',
        },
        attributes: {
            name: DataTypes.STRING,
            id: DataTypes.STRING,
            url: DataTypes.STRING,
            start: DataTypes.STRING,
            thumbnail: DataTypes.STRING,
            eventId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
        }
    };

    const Event = sequelize.define(config.name, config.attributes, config.options);


    return Event;
};