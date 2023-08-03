module.exports = (sequelize, dataTypes) => {
  let alias = 'Product'
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

    category_id: dataTypes.BIGINT(20).UNSIGNED,

    price: {
      type: dataTypes.BIGINT(20).UNSIGNED,
      allowNull: false
    },
    description: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    image: {
      type: dataTypes.STRING(255),
      allowNull: false
    },

    created_at: dataTypes.DATE,
    updated_at: dataTypes.DATE

  }

  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }

  const Products = sequelize.define(alias, cols, config);

  // Products.associate = (models) => {
  //   Products.belongsTo()
  // }

}