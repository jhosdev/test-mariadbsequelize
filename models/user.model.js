/**
 * base schema for 'Usuario':
usu_id	Number	claveprincipal
usu_cuenta	String	minuscula
usu_clave	String	minuscula
usu_nombre	String	minuscula
id_estado	int	minuscula
usu_fechacreacion	date	
usu_fechavencimientoclave	date	
usu_tokenrecuperacion	String	minuscula
usu_fechavencimientotoken	date	
 */

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Usuario", {
        usu_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usu_cuenta: { //TODO: ask type of account
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        usu_clave: {
            type: Sequelize.STRING,
            isLowercase: true,
            allowNull: false,
            unique: true,
        },
        usu_nombre: {
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
        usu_fechacreacion: {
            type: Sequelize.DATE
        },
        usu_fechavencimientoclave: {
            type: Sequelize.DATE
        },
        usu_tokenrecuperacion: {
            type: Sequelize.STRING
        },
        usu_fechavencimientotoken: {
            type: Sequelize.DATE
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'usu_fechacreacion',
        updatedAt: false,
    });
    return User;
}