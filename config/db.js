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

// Define models
db.country = require("../models/country.model.js")(sequelize, Sequelize);
db.company = require("../models/company.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.login_log = require("../models/login_log.model.js")(sequelize, Sequelize);
db.user_company = require("../models/user_company.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.menu = require("../models/menu.model.js")(sequelize, Sequelize);
db.rol_menu = require("../models/rol_menu.model.js")(sequelize, Sequelize);
db.user_menu_role = require("../models/user_menu_role.model.js")(sequelize, Sequelize);
db.status = require("../models/status.model.js")(sequelize, Sequelize);

module.exports = db;