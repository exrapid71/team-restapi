'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'user_skill_relation',
        options: {
            tableName: 'user_skill_relation',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            skill_id: { type: DataTypes.INTEGER, allowNull: false },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE
        }
    };

    const UserSkill = sequelize.define(config.name, config.attributes, config.options);

    return UserSkill;
};