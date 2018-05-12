'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'team_skill_relation',
        options: {
            tableName: 'team_skill_relation',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            team_id: { type: DataTypes.INTEGER, allowNull: false },
            skill_id: { type: DataTypes.INTEGER, allowNull: false },
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE
        }
    };

    const TeamSkill = sequelize.define(config.name, config.attributes, config.options);

    return TeamSkill;
};
