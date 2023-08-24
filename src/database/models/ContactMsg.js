module.exports = (sequelize, dataTypes) => {
    let alias = "ContactMessage";
    
    let cols = {
      id: {
        type: dataTypes.BIGINT(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      message: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      response: {
        type: dataTypes.STRING(255)
      },
      is_answered: {
        type: dataTypes.BOOLEAN
      },    
      created_at: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: dataTypes.DATE
      }
    };
  
    let config = {
      tableName: "contact_msg",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: false,
    };
  
    const ContactMessage = sequelize.define(alias, cols, config);
  
    ContactMessage.associate = (models) => {
      ContactMessage.belongsTo(models.User, {
        as: "contactmessage",
        foreignKey: "user_id",
      });
    };
  
    return ContactMessage;
  };
  