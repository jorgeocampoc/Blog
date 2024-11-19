var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogsRouter = require('./routes/blogs');
var authRouter = require('./routes/auth');
var jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(authHeader) {
        const token = authHeader.split(' ')[1];
console.log(token);
        jwt.verify(token, 'secretkey', (err, user) => {
            if(err) {
                return res.status(403).send({
                    message: 'Token invalido'
                });
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: 'No hay token'
        })
    }
}

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter,);
app.use('/users' ,usersRouter);
app.use('/blogs' ,blogsRouter);
app.use('/auth', authRouter);



module.exports = app;
