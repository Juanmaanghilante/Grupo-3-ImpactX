module.exports = (sequelize, dataTypes) => {
  let alias = "Product";

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
    category_id: {
      type: dataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
    },
    price: {
      type: dataTypes.BIGINT(20),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    created_at: dataTypes.DATE,
    updated_at: dataTypes.DATE,
    deleted_at: dataTypes.DATE

  };

  let config = {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true
  };

  const Products = sequelize.define(alias, cols, config);

  Products.associate = (models) => {
    Products.belongsTo(models.Category, {
      as: "categorias",
      foreignKey: "category_id",
    });
    Products.belongsToMany(models.User, {
      as: "usuarios",
      through: "user_product",
      foreignKey: "product_id",
      otherKey: "user_id",
      timestamps: false
    })
    Products.belongsToMany(models.Ticket, {
      as: "tickets",
      through: "product_ticket",
      foreignKey: "product_id",
      otherKey: "ticket_id",
      timestamps: false
    })

  };
  return Products;
};
