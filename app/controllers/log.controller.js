const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Weapon = db.weapon;
const BulletLog = db.bulletLog;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.addLog = (req, res) => {
  if (req.body.weapon_id) {
    Weapon.findOne({
      where: {
        weapon_id: req.body.weapon_id,
      },
    }).then((weapon) => {
      if (!weapon) {
        return res.status(404).send({ message: "Weapon Not found." });
      }
      BulletLog.create({
        shoot_date: req.body.shoot_date,
        amount: req.body.amount,
        cause: req.body.cause,
        description: req.body.description,
        weapon_uuid: weapon.weapon_uuid,
        author_id: req.userId,
      })
        .then((log) => {
          res.status(200).send({ message: "Log was created", log });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    });
  } else {
    return res.status(401).send({ message: "invalid weapon id." });
  }
};

exports.searchLog = (req, res) => {
  if (req.params.uuid) {
    BulletLog.findOne({
      where: {
        uuid: req.params.uuid,
      },
    })
      .then((log) => {
        if (!log) {
          return res.status(404).send({ message: "Weapon LOG Not found." });
        }
        return res.status(200).send({ log });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    return res.status(401).send({ message: "invalid log uuid." });
  }
};
