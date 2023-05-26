module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
        idMenu: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        idParent: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        name: {
            type: Sequelize.STRING
        },
        route: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        icon: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        order: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },
    }, {
        freezeTableName: true
    });
    return Menu;
};