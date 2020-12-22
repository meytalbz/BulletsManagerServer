const db = require("../models");
const Weapon = db.weapon;
const WeaponType = db.weaponType;

exports.addWeaponType = (req, res) => {
  WeaponType.create({
    type_id:req.body.type_id,
    weapon_name: req.body.weapon_name,
    caliber_diameter: req.body.caliber_diameter,
    caliber_hight: req.body.caliber_hight,
  })
    .then((weapon_type) => {
      res.status(200).send({ message: "Weapon type was created" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.createWeapon = (req, res) => {
  Weapon.create({
    weapon_id: req.body.weapon_id,
    weapon_type: req.body.weapon_type,
  })
    .then((weapon) => {
      res.status(200).send({ message: "Weapon was created" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
