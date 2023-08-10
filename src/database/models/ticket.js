module.exports = (sequelize, dataTypes) => {
  let alias = "Ticket";

  let cols = {
    id: {
      type: dataTypes.BIGINT(20).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
    },
    date: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    adress: dataTypes.STRING(255),
    city: dataTypes.STRING(255),
    province: dataTypes.STRING(255),
    country: dataTypes.STRING(255),
    total: {
      type: dataTypes.BIGINT(20).UNSIGNED,
      allowNull: true,
    },
    created_at: dataTypes.DATE,
    updated_at: dataTypes.DATE

  };
  let config = {
    tableName: "ticket",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };
  const Ticket = sequelize.define(alias, cols, config);

  return Ticket;
};
