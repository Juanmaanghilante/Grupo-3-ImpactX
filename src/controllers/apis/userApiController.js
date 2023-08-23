const db = require("../../database/models");
const bcrypt = require("bcryptjs");
const User = db.User;

module.exports = {
  'list': async (req, res) => {
      let response = {}
      try {
        const usuariosHabilitados = await User.findAll({ paranoid: true })
              response.meta = {
              status: 200,
              total: usuariosHabilitados.length,
              url: '/api/users'
          }
            response.data = usuariosHabilitados
            return res.json(response)

      } catch (error) {
            console.error("Error fetching users:", error);
            response.meta = {
              status: 500,
              total: null,
              url: '/api/users'
          }
            response.msg = "Oops! Something went wrong while fetching users."
            return res.status(500).json(response);
      }
  },

  'detail': async (req, res) => {
    let response = {}
    try {
      const findUser = await User.findByPk(req.params.id)
          response.meta = {
            status: 200,
            total: findUser.length,
            url: `/api/users/${req.params.id}`
        }
          response.data = findUser
          return res.json(response)

    } catch (error) {
          console.error("Error finding user:", error);
          response.meta = {
            status: 500,
            total: null,
            url: `/api/users/${req.params.id}`
        }
          response.msg = `Oops! Something went wrong while finding the user with ID: ${req.params.id}.`
          return res.status(500).json(response);
    }
  },

  create: async (req, res) => {
    let response = {}
    try {
      const usuarioCrear= await User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        user_name: req.body.user,
        email: req.body.email,
        profile_id: req.body.categoria ? req.body.categoria : "2",
        password: bcrypt.hashSync(req.body.password, 10),
        confirm_password: bcrypt.hashSync(req.body.repeatPassword, 10),
        image: req.file ? req.file.filename : "product-default.png",
      })
          response.meta = {
            status: 201,
            url: '/api/users/create'
        }
          response.data = usuarioCrear
          return res.json(response)

    } catch (error) {
          console.error("Error creating user:", error);
          response.meta = {
            status: 500,
            url: '/api/users/create'
        }
          response.msg = "Oops! Something went wrong while creating the user. Please try again later."
          return res.status(500).json(response)
    }
  },

  update: async (req, res) => {
    let response = {}
    let userId = req.params.id
    try {
      const editUser = await User.update({
        name: req.body.name,
        lastname: req.body.lastname,
        user_name: req.body.user,
        email: req.body.email,
        profile_id: req.body.categoria ? req.body.categoria : "2",
        image: req.file ? req.file.filename : "product-default.png",
      },

      {
        where: {id: userId}
      })
      console.log(editUser)
          response.meta = {
              status: 201,
              url: `/api/users/edit/${req.params.id}`
          }
          response.msg = `User successfully updated!`
          return res.json(response)

    } catch (error) {
          console.error("Error creating user:", error);
        response.meta = {
            status: 500,
            url:  `/api/users/edit/${req.params.id}`
        }
          response.msg = "Oops! Something went wrong while updating the user. Please try again later."
          return res.status(500).json(response)
    }
  },

  destroy: async (req, res) => {
    let response = {};
    try {
        let userId = req.params.id;
        const deleteUser = await User.destroy({
            where: { id: userId },
            force: false,
        });
        if (deleteUser) {
            response.meta = {
                status: 200,
                url: `/api/users/delete/${userId}`
            };
            response.msg = "User successfully deleted!";
        } else {
            response.meta = {
                status: 404, 
                url: `/api/users/delete/${userId}`
            };
            response.msg = "User not found for deletion.";
        }
        return res.json(response);
    } catch (error) {
      console.error("Error deleting user:", error);
        response.meta = {
            status: 500, 
            url: `/api/users/delete/${userId}`
        };
        response.msg = "Oops! Something went wrong while deleting the user. Please try again later.";
        return res.status(500).json(response)
    }
},
}