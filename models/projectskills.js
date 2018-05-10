'use strict'

module.exports = (sequelize, DataTypes) => {

    var config = {
        name: 'project_skill_relation',
        options: {
            tableName: 'project_skill_relation',
        },
        attributes: {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            project_id: { type: DataTypes.INTEGER, allowNull: false },
            skill_id: { type: DataTypes.INTEGER, allowNull: false },
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE
        }
    };

    const ProjectSkill = sequelize.define(config.name, config.attributes, config.options);

    return ProjectSkill;
};
