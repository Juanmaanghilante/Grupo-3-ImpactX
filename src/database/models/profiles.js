module.exports = (sequelize, dataTypes) => {
  let alias = "Profile";

  let cols = {
    id: {
      type: dataTypes.BIGINT(20).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    name: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: dataTypes.DATE,
      allowNull: false,
    },
  };
  let config = {
    tableName: "profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };
  const profiles = sequelize.define(alias, cols, config);

  return profiles;
};
