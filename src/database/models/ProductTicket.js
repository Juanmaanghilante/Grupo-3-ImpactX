module.exports = (sequelize, dataTypes) => {
    let alias = "ProductTicket";
  
    let cols = {
      id: {
        type: dataTypes.BIGINT(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      ticket_id: {
        type: dataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      product_id: {
        type: dataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      price: {
        type: dataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      }
    };
    let config = {
        tableName: "product_ticket",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
        deletedAt: false,
    };
  
    const ProductTickets = sequelize.define(alias, cols, config);
  
    return ProductTickets;
  };
  