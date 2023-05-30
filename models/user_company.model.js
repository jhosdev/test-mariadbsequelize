/**
 * base schema for 'EmpresaUsuario':
empusu_id	Number
id_usuario	Number
id_empresa	Number
id_estado	int
 */

module.exports = (sequelize, Sequelize) => {
    const UserCompany = sequelize.define("EmpresaUsuario", {
        empusu_id: {
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
        id_empresa: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Empresa',
                key: 'emp_id'
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
    return UserCompany;
}