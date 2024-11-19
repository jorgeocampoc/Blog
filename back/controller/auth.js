const { response: res, request: req } = require('express')
const conexion = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { email, password } = req.body;

    var query = `SELECT * FROM users WHERE email = ?`;

    conexion.query(query, [email], async function (error, results, fields) {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).send({
                error: error.message,
                message: 'Transaction error'
            });
        }

        if (results.length === 0) {
            return res.status(403).send({
                message: 'User not found!'
            });
        }

        const user = results[0];

        try {

            if (password !== user.password) {
                return res.status(403).send({
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign({ user: user }, 'secretkey', { expiresIn: '10h' });
            return res.status(200).send({
                user,
                token
            });

        } catch (err) {
            console.error('Error al comparar las contraseñas:', err);
            return res.status(500).send({
                message: 'Error comparando contraseñas'
            });
        }
    });
};


module.exports = {auth}







  







      
module.exports = {
    auth,
}


      

