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
    }
  };
  let config = {
    tableName: "users",
    deletedAt: false,
  };

  const Users = sequelize.define(alias, cols, config);

  return Users;
};
