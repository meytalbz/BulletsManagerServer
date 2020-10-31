const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const WeaponType = db.weaponType;
const Weapon = db.weapon;

//  For Development
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
  dev_data();
});

// For production
// db.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  Role.create({
    id: 4,
    name: "everyone",
  });

  WeaponType.create({
    type_id: 1,
    weapon_name: "M24",
    caliber_diameter: "7.62",
    caliber_hight: "51",
  });
}

//DEV ONLY UNTIL PROD:
// START:
var bcrypt = require("bcryptjs");

function dev_data() {
  User.create({
    username: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123123", 8),
  }).then((user) => {
    // role 3 = ADMIN
    user.setRoles([3]).then(() => {
      console.log("Admin user was created");
    });
  });

  Weapon.create({
    weapon_id: "1111",
    weapon_type: 1,
  });
}
//END

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
