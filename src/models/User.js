
// Editar la info de un usuario
const fs = require('fs')
const path = require('path');


module.exports = {
  fileName: path.resolve(__dirname, '../database/user.json'),
  
  getData: function () {
   return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
  },


  generateId: function() {
    const allUsers = this.findAll();

    // pop saca el ultimo elemento del array
    const lastUser = allUsers.pop();

    if(lastUser) return lastUser.id + 1;
    return 1;
  },


  findAll: function () {
    return this.getData()
  },


  findByPk: function (id) {
    const allUsers = this.findAll();
    const userFound = allUsers.find( row => row.id === id );

    return userFound
  },


  // devuelve el primero que encuentra
  findByField: function (field, text) {
    const allUsers = this.findAll();
    const userFound = allUsers.find( row => row[field] == text );

    return userFound
  },
  

  create: function (userData) {
    const allUsers = this.findAll();
   
    let newUser = {
      id:this.generateId(),
      ...userData
    }

    allUsers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, 2), 'utf-8');
    return newUser;
  },


  delete: function (id) {
    const allUsers = this.findAll();
    const finalUsers = allUsers.filter( row => row.id !== id );
    
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, 2), 'utf-8');
  } 

}
