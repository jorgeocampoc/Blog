const { response: res, request: req } = require("express");
const conexion = require("../database");
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
    let query = 'select * from users'
    conexion.query(query,(err, results) =>{
        if(err){
            res.status(500).json({
                ok:false,
                err,
                msg:'Error'
            })
            return
        }
        res.status(200).json({
            ok:true,
            results,
        })
    })
};


const registerUser = async(req, res) =>{
    const { fullName, email, password } = req.body;
    let query = 'insert into users (full_name, email, password) values (?,?,?)'
    conexion.query(query,[fullName, email, password], (err,results) =>{
        if( err ){
            res.status(500).json({
                ok:false,
                err,
                msg:'Error'
            })
            return
        }
        res.status(200).json({
            ok:true,
          msg:'reigstrado con exito',
        })
    })
}


module.exports = {
  getUsers,
  registerUser,
  
};
