module.exports = (sequelize, dataTypes) =>{

    let alias='User_product'

    let cols={
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
user_id:{ 
     type: dataTypes.BIGINT(20).UNSIGNED,
     allowNull: false,
    },
product_id:{
    type: dataTypes.BIGINT(20).UNSIGNED,
    allowNull: false,
},
status:{
    type: dataTypes.STRING(255),
    allowNull: false

},



    }
    let config = {
        tableName: 'user_products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
      }
     
      const user_products = sequelize.define(alias, cols, config);

    
  }
    

