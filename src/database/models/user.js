module.exports = (sequelize, dataTypes) => {
  let alias = "User";

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
    lastname: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    user_name: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    profile_id: {
      type: dataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    confirm_password: {
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
    }
  };
  let config = {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Users = sequelize.define(alias, cols, config);

  Users.associate = (models) => {
    Users.belongsTo(models.Profile, {
      as: "perfiles",
      foreignKey: "profile_id",
    });
  };

  return Users;
};
