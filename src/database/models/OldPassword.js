module.exports = (sequelize, dataTypes) => {
  let alias = "OldPassword";

  let cols = {
    id: {
      type: dataTypes.BIGINT(20).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    old_password: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    created_at: dataTypes.DATE,
    updated_at: dataTypes.DATE
  };

  let config = {
    tableName: "old_passwords",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const OldPassword = sequelize.define(alias, cols, config);

  return OldPassword;
};
