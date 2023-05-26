// 1.) Access the Node File System package
//const fs = require("fs");

// 2.) Retrieve the Certificate Authority chain file (wherever you placed it - notice it's just in the Node project root here)
//const cert = [fs.readFileSync("skysql_chain.pem", "utf8")];

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mariadb',
  // 3.) Add an "ssl" property to the dialectOptions configuration, using the serverCert const defined above
  /*dialectOptions: { 
    ssl: {
      ca: cert
    }
  },*/
  define: {
    timestamps: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require("../models/role.model.js")(sequelize, Sequelize);
db.menus = require("../models/menu.model.js")(sequelize, Sequelize);
db.companies = require("../models/company.model.js")(sequelize, Sequelize);
db.users = require("../models/user.model.js")(sequelize, Sequelize);

db.menu_roles = require("../models/menu_rol.model.js")(sequelize, Sequelize);

// Define associations
db.roles.belongsToMany(db.menus, { through: db.menu_roles, foreignKey: 'fk_idRol' });
db.menus.belongsToMany(db.roles, { through: db.menu_roles, foreignKey: 'fk_idMenu' });


module.exports = db;