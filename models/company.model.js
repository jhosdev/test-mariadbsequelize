module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("empresa", {
        idEmpresa: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        pais: {
            type: Sequelize.STRING
        },
    }, {
        freezeTableName: true
    });
    return Company;
};

