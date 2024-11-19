const { response: res, request: req } = require("express");
const conexion = require("../database");

const getBlogs = (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const query = `SELECT *, u.full_name FROM blogs as b  left join users as u on u.id = b.user_id LIMIT ? OFFSET ?`;

    conexion.query(query, [limit, offset], (err, results) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err,
                msg: 'Transaction error',
            });
            return;
        }
        const countQuery = `SELECT COUNT(*) as total FROM blogs`;
        conexion.query(countQuery, (countErr, countResults) => {
            if (countErr) {
                res.status(500).json({
                    ok: false,
                    err: countErr,
                    msg: 'Count blogs error',
                });
                return;
            }
            const total = countResults[0].total;
            const totalPages = Math.ceil(total / limit);

            res.status(200).json({
                ok: true,
                results,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                },
            });
        });
    });
};

const postBlog = (req, res) => {
    const { titulo, comment, user_id, create_at } = req.body;   
    let query = `INSERT INTO blogs (comment, create_at, titulo, user_id) VALUES (?, ?, ?, ?)`;
    console.log(query);
    const values = [comment, create_at, titulo, user_id]; 
    conexion.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                ok: false,
                err,
                msg: "Error en la base de datos"
            });
        }
        res.status(201).json({
            ok: true,
        });
    });
};

const deleteBlog = (req, res) =>{
    let query = 'DELETE FROM blogs WHERE id=?'
    conexion.query(query,[req.params.id], (err,results) =>{
        if( err ){
            return res.status(500).json({
                ok: false,
                err,
                msg: "Error en la base de datos"
            });
        }
        res.status(201).json({
            ok: true,
        });
    })
}

const getBlogsById = (req,res) =>{
    let query = 'select * FROM blogs WHERE user_id=?'
    conexion.query(query,[req.params.id], (err,results) =>{
        if( err ){
            return res.status(500).json({
                ok: false,
                err,
                msg: "Error en la base de datos"
            });
        }
        res.status(201).json({
            results
        });
    })
}


const putBlog = (req, res) =>{
    const {comment,update_at, titulo, id} = req.body;
    let query = 'update blogs set comment=?, update_at=?, titulo=? WHERE id=?'
    conexion.query(query,[comment, update_at, titulo, id], (err,results) =>{
        if( err ){
            return res.status(500).json({
                ok: false,
                err,
                msg: "Error en la base de datos"
            });
        }
        res.status(201).json({
            ok:true,
            msg:'Edited blog'
        });
    })
}

module.exports = {
    getBlogs,
    postBlog,
    deleteBlog,
    getBlogsById,
    putBlog
};
