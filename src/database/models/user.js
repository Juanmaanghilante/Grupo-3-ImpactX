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
    password: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    confirm_password: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },    
    created_at: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: dataTypes.DATE
    },
    deleted_at: {
      type: dataTypes.DATE
    }
  
  };
  let config = {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true 
  };

  const Users = sequelize.define(alias, cols, config);

  Users.associate = (models) => {
    Users.belongsTo(models.Profile, {
      as: "perfiles",
      foreignKey: "profile_id",
    });

    Users.hasMany(models.ContactMessage, {
      as: "contactmessage",
      foreignKey: "user_id",
    });
    Users.belongsToMany(models.Product, {
      as: "productos",
      through: "user_product",
      foreignKey: "user_id",
      otherKey: "product_id",
      timestams: false
    })
    Users.hasMany(models.Ticket, {
      as: "tickets",
      foreignKey: "user_id",
    });
    
  };

  return Users;
};
