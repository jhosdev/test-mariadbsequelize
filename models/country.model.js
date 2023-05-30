/**
 * base schema for country:
 * pai_id: pk, int
 * pai_nombre: string
 * id_estado: fk
 */

module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("Pais", {
        pai_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pai_nombre: {
            type: Sequelize.STRING
        },
        id_estado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Estados',
                key: 'est_id'
            }
        },
    }, {
        freezeTableName: true
    });
    return Country;
}