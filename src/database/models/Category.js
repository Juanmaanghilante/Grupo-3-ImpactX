module.exports = (sequelize, dataTypes) => {
  let alias = 'Category'
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING(255),
      allowNull: false
    },

    created_at: dataTypes.DATE,
    updated_at: dataTypes.DATE

  }

  let config = {
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }

  const Category = sequelize.define(alias, cols, config);
  return Category

}