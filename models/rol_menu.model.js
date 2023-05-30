module.exports = (sequelize, Sequelize) => {
    const MenuRol = sequelize.define("RolMenu", {
        rolmen_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_rol: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Rol',
                key: 'rol_id'
            }
        },
        id_menu: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Menu',
                key: 'men_id'
            }
        },
        id_estado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Estados',
                key: 'est_id'
            }   
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return MenuRol;
};