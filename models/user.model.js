module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Usuario", {
        usu_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            isLowercase: true
        },
        password: {
            type: Sequelize.STRING,
            isLowercase: true
        },
        active: {
            type: Sequelize.STRING,
            isLowercase: true
        },
        fk_idRol: {
            type: Sequelize.INTEGER,
            references: {
                model: 'rol',
                key: 'idRol'
            }
        },
        fk_idEmpresa: {
            type: Sequelize.INTEGER,
            references: {
                model: 'empresa',
                key: 'idEmpresa'
            }
        },
    }, {
        timestamps: true,
        createdAt: 'usu_fechacreacion',
        updatedAt: false,
        freezeTableName: true
    });
    return User;
};