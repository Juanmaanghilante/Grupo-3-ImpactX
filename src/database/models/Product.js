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
    deletedAt: "deleted_at"
  };

  const Products = sequelize.define(alias, cols, config);

  Products.associate = (models) => {
    Products.belongsTo(models.Category, {
      as: "categorias",
      foreignKey: "category_id",
    });
  };
  return Products;
};
