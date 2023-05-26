module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("rol", {
        idRol: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        rol: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true
    });
    return Role;
};