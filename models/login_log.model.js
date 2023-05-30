/**
 * base schema for 'BitacoraInicioSesion':
bitini_id	Number
id_usuario	Number
bitini_fechaingreso	date
bitini_latitud	String
bitini_longitud	String
id_empresa	Number
 */

module.exports = (sequelize, Sequelize) => {
    const LoginLog = sequelize.define("BitacoraInicioSesion", {
        bitini_id: {
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
        bitini_fechaingreso: {
            type: Sequelize.DATE
        },
        bitini_latitud: {
            type: Sequelize.STRING
        },
        bitini_longitud: {
            type: Sequelize.STRING
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Empresa',
                key: 'emp_id'
            }
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    return LoginLog;
}