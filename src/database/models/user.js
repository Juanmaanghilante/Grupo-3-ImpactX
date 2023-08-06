module.exports = (sequelize, dataTypes) =>{
let alias='User'

let cols={
    id: {
        type: dataTypes.BIGINT(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name:{
        type: dataTypes.STRING(255),
        allowNull: false
      },
      lastname:{
        type: dataTypes.STRING(255),
        allowNull: false
      },
      user_name:{
        type: dataTypes.STRING(255),
        allowNull: false
      },
      email:{
        type: dataTypes.STRING(255),
        allowNull: false
      },
      profile_id:{
        type: dataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      password:{
        type: dataTypes.STRING(255),
        allowNull: false
      },
      create_at:{
        type:dataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type:dataTypes.DATE,
        allowNull: false
    },
    confirm_password:{
        type: dataTypes.STRING(255),
        allowNull: false
    }



}
let config = {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }
  
  const users = sequelize.define(alias, cols, config);
  
  // Asociación entre User y Product a través de user_product (tabla intermedia)
  users.associate = (models) => {
    users.belongsToMany( models.Product,
      {
        as: 'user_product',
        foreignKey: 'user_id',
        through:'user_product'
      } )
  }
  // Asociación entre User y old_password 

 users.associate = (models) => {
    users.hasMany( models.old_password,
      {
        as: 'old_password',
        foreignKey: 'user_id'
       
      } )



}}