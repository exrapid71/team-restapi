'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'skill',
        options: {
            tableName: 'skill',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: DataTypes.STRING
        }
    };

    const Skill = sequelize.define(config.name, config.attributes, config.options);


    return Skill;
};