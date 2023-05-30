/**
 * base schema for 'Menu':
men_id	Number
men_nombre	String
men_ruta	String
men_idpadre	Number
men_nivel	Number
men_orden	Number
men_icono	varchar(50)
id_estado	int
 */

module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("Menu", {
        men_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        men_nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        men_ruta: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        men_idpadre: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Menu',
                key: 'men_id'
            },
            defaultValue: null,
            allowNull: true,
        },
        men_nivel: {
            type: Sequelize.INTEGER
        },
        men_orden: {
            type: Sequelize.INTEGER
        },
        men_icono: {
            type: Sequelize.STRING
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
    return Menu;
}