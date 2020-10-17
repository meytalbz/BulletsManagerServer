module.exports = (sequelize, Sequelize) => {
  const Weapon = sequelize.define("weapons", {
    weapon_uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    weapon_id: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    weapon_type: {
      type: Sequelize.INTEGER,
    },
  });

  return Weapon;
};
