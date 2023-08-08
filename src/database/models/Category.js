module.exports = (sequelize, dataTypes) => {
  let alias = "Category";
  
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
    updated_at: dataTypes.DATE,
  };

  let config = {
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = (models) => {
    Category.belongsToMany(models.Product, {
      through: "Actor_Movie",
      foreignKey: "movie_id",
      otherKey: "actor_id",
    });
  };

  return Category;
};
