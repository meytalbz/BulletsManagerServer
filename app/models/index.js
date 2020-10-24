const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: true,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.weaponType = require("../models/weaponType.model")(sequelize, Sequelize);
db.weapon = require("../models/weapon.model")(sequelize, Sequelize);
db.bulletLog = require("../models/bulletLog.model")(sequelize, Sequelize);

//assosiation between role & user
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

//assosiation between weaponType & weapon
db.weaponType.hasMany(db.weapon, {
  foreignKey: {
    name: "weapon_type",
    type: Sequelize.INTEGER,
  },
});

//assosiation between weapon & bulletLog
db.weapon.hasMany(db.bulletLog, {
  foreignKey: {
    name: "weapon_uuid",
    type: Sequelize.UUID,
  },
});

//assosiation between bulletLog & user
db.user.hasMany(db.bulletLog, {
  foreignKey: {
    name: "author_id",
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

db.ROLES = ["user", "admin", "moderator", "everyone"];

module.exports = db;
