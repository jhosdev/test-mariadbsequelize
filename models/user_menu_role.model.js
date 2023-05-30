/**
 * base schema for 'UsuarioRolMenu':
    usurolmen_id	Number
id_usuario	Number
id_rolmenu	Number
id_estado	int
*/

module.exports = (sequelize, Sequelize) => {
    const UserMenuRol = sequelize.define("UsuarioRolMenu", {
        usurolmen_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Usuario',
                key: 'usu_id'
            }
        },
        id_rolmenu: {
            type: Sequelize.INTEGER,
            references: {
                model: 'RolMenu',
                key: 'rolmen_id'
            }
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
    return UserMenuRol;
}