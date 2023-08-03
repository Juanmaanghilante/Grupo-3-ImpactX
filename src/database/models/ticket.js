
module.exports = (sequelize, dataTypes) =>{
    let alias='User'
    
let cols={
id: {
    type: dataTypes.BIGINT(20).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  user_id: {
    type: dataTypes.BIGINT(20).UNSIGNED,
  
    allowNull: false,
   
  },
  date:{
    type:dataTypes.date,
    allowNull: false,
  },
  adress:{
    type: dataTypes.STRING(255),
    allowNull: false
  },
  city:{
    type: dataTypes.STRING(255),
    allowNull: false
  },
  province:{
    type: dataTypes.STRING(255),
    allowNull: false
  },
  country:{
    type: dataTypes.STRING(255),
    allowNull: false
  },
  total:{
    type: dataTypes.BIGINT(20).UNSIGNED,
    allowNull:true
  },
  create_at:{
    type:dataTypes.DATE,
    allowNull: false
},
updated_at:{
    type:dataTypes.DATE,
    allowNull: false
}



}
let config = {
    tableName: 'ticket',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }
  const ticket = sequelize.define(alias, cols, config);

 

  
}