/**
 * base schema for 'Empresa':
 emp_id	Number
emp_nrodocumento	String
emp_nombre	String
emp_direccion	String
emp_telefono	String
id_pais	Number
id_estado	int
 */

module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("Empresa", {
        emp_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        emp_nrodocumento: {
            type: Sequelize.STRING
        },
        emp_nombre: {
            type: Sequelize.STRING
        },
        emp_direccion: {
            type: Sequelize.STRING
        },
        emp_telefono: {
            type: Sequelize.STRING
        },
        id_pais: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Pais',
                key: 'pai_id'
            }
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
    return Company;
}
