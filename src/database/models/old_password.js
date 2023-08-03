module.exports = (sequelize, dataTypes) =>{

let alias='old_password'

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
     old_password:{
        type: dataTypes.STRING(255),
        allowNull: false
},
created_at: {
    type: dataTypes.DATE,
    allowNull: false
    
  }, 
  updated_at: {
    type: dataTypes.DATE,
    allowNull: false
  }
     }
     let config = {
        tableName: 'old_passwords',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
}
const old_password = sequelize.define(alias, cols, config);
old_password.associate = (models) => {
    old_password.belongsTo( models.users,
      {
        as:'user',
        foreignKey:'user_id',
       
      } )

}}
