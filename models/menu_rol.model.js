module.exports = (sequelize, Sequelize) => {
    const MenuRol = sequelize.define("menu_rol", {
        idMenuRol: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        fk_idMenu: {
            type: Sequelize.INTEGER,
            references: {
                model: 'menu',
                key: 'idMenu'
            }
        },
        fk_idRol: {
            type: Sequelize.INTEGER,
            references: {
                model: 'rol',
                key: 'idRol'
            }
        },
        active: {
            type: Sequelize.BOOLEAN
        },
    }, {
        timestamps: true,
        createdAt: 'mer_fechacreacion',
        updatedAt: false,
        freezeTableName: true
    });
    return MenuRol;
};