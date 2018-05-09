'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'team',
        options: {
            tableName: 'team',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: DataTypes.STRING,
            members: DataTypes.STRING,
            info: DataTypes.STRING,
            contact_mail: DataTypes.STRING
        }
    };

    const Team = sequelize.define(config.name, config.attributes, config.options);


    return Team;
};