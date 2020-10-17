module.exports = (sequelize, Sequelize) => {
  const BulletLog = sequelize.define("bullets_log", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    author_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    weapon_uuid: {
      type: Sequelize.UUID,
    },
    shoot_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    cause: {
      type: Sequelize.ENUM,
      values: ["Test", "Mission", "Training"],
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return BulletLog;
};
