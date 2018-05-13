'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'event_team_relation',
        options: {
            tableName: 'event_team_relation',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            event_id: { type: DataTypes.INTEGER, allowNull: false },
            team_id: { type: DataTypes.INTEGER, allowNull: false },
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
            created_at: { type: DataTypes.DATE, defaultValue: null},
        }
    }

    const EventTeam = sequelize.define(config.name, config.attributes, config.options);

    return EventTeam;
};