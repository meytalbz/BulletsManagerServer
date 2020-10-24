module.exports = (sequelize, Sequelize) => {
  const WeaponType = sequelize.define("weapon_types", {
    type_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    weapon_name: {
      type: Sequelize.STRING,
    },
    caliber_diameter: {
      type: Sequelize.STRING,
    },
    caliber_hight: {
      type: Sequelize.STRING,
    },
  });

  return WeaponType;
};
