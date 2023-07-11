const { body } = require('express-validator');
const path = require('path')

module.exports = [
  body('user').notEmpty().withMessage('Debe completar el nombre de usuario'),
  body('name').notEmpty().withMessage('Debe completar el campo con su nombre'),
  body('lastName').notEmpty().withMessage('Debe completar el campo con su apellido'),

  body('email')
    .notEmpty().withMessage('Debe completar el campo con su email').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),

  //body('category').notEmpty().withMessage('Debe elegir una categoría'),
  body('password').notEmpty().withMessage('Debe completar el campo con su contraseña'),

  body('profilePic').custom((value, { req }) => {
    let file = req.file;
    let extensionesPermitidas = ['.jpg', '.png', '.gif'];
   
    if (!file) {
      throw new Error('Debe seleccionar una imagen de perfil')
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!extensionesPermitidas.includes(fileExtension)) {
        throw new Error(`Extensiones permitidas: ${extensionesPermitidas.join(', ')}`)
      }
    }
    return true
  })
]