const path = require('path');
const { body } = require('express-validator');
const fs = require('fs');
const bcrypt = require("bcryptjs");

const rutaBase = path.resolve("./src/database/user.json");
const datos = JSON.parse(fs.readFileSync(rutaBase));
const archivoPass = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/passwords.json")));

module.exports = [
	body('contrasenia')
		.notEmpty().withMessage('Debe ingresar su contraseña').bail()
		.custom((value, { req }) => {

			const usuarioAEvaluarSinPass = req.session.userLogged
			console.log(usuarioAEvaluarSinPass)
			const usuarioAEvaluarConPass = datos.find(row => row.user == usuarioAEvaluarSinPass.user)
			console.log(usuarioAEvaluarConPass)
			const passDescifrada = bcrypt.compareSync(req.body.contrasenia, usuarioAEvaluarConPass.password)
			console.log(passDescifrada)

			if (!passDescifrada) {
				throw new Error('La contraseña ingresada no es correcta');
			}

			return true;

		}),

	body("contraseniaNueva")
		.notEmpty().withMessage('Debe ingresar su contraseña nueva').bail()
		.isStrongPassword({ minLength: 6, minUppercase: 1, minLowercase: 1, minSymbols: 1 }).withMessage('La contraseña debe tener como minimo: 6 caracteres, una minuscula, una mayuscula y un simbolo ').bail(),

	body('contraseniaNuevaRepetir')
		.notEmpty().withMessage('Debe repetir su contraseña nueva').bail()
		.custom((value, { req }) => {

			if(req.body.contraseniaNueva != req.body.contraseniaNuevaRepetir) {
				throw new Error('Las contraseñas nuevas no coinciden');
			}

			return true;

		}).bail()
		.custom((value, { req }) => {

			if(req.body.contraseniaNueva == req.body.contrasenia) {
				throw new Error('Debe ingresar una contraseña distinta de la actual');
			}

			return true;

		}).bail()
		.custom((value, { req }) => {

			const usuarioAEvaluar = req.session.userLogged

			const passAModificar = archivoPass.find(row => row.user == usuarioAEvaluar.user && bcrypt.compareSync(req.body.contraseniaNueva, row.password))
			
			if (passAModificar) {
				throw new Error('La contraseña ingresada ya ha sido utilizada');
			}

			return true;

		})

];
