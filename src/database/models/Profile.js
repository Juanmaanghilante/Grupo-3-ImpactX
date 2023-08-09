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
    created_at: dataTypes.DATE,
    updated_at: dataTypes.DATE

  };
  let config = {
    tableName: "profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };
  const Profiles = sequelize.define(alias, cols, config);

  Profiles.associate = (models) => {
    Profiles.hasMany(models.User, {
      as: "perfiles",
      foreignKey: "profile_id",
    });
  };  

  return Profiles;
};
