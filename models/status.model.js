/**
 * base schema for 'Estados':
 * est_id	int
est_nombre	varchar(50)
est_origen	varchar(50)
est_activo	bit
 */

module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("Estados", {
        est_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        est_nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        est_origen: {
            type: Sequelize.STRING
        },
        est_activo: {
            type: Sequelize.BOOLEAN
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    return Status;
}