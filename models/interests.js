'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'interest',
        options: {
            tableName: 'interest',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: DataTypes.STRING
        }
    };

    const Interest = sequelize.define(config.name, config.attributes, config.options);


    return Interest;
};