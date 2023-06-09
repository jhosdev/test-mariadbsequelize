/**
 * base schema for 'Rol':
rol_id	Number
rol_nombre	String
id_estado	int
 */

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Rol", {
        rol_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rol_nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        id_estado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Estados',
                key: 'est_id'
            }
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    return Role;
}