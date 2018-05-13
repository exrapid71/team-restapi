'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'user_team_relation',
        options: {
            tableName: 'user_team_relation',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            team_id: { type: DataTypes.INTEGER, allowNull: false },
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
            created_at: { type: DataTypes.DATE, defaultValue: null},
        }
    };

    const UserSkill = sequelize.define(config.name, config.attributes, config.options);

    return UserSkill;
};