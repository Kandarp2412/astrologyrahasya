var Sequelize = require("sequelize");

var sequelize = new Sequelize("astrology", "root", "rootroot", {
  host: "localhost",
  dialect: "mysql",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
});

let db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.location_search = require("./location_search")(sequelize, Sequelize);
db.user_profile = require("./user_profile")(sequelize, Sequelize);

module.exports = { db };
