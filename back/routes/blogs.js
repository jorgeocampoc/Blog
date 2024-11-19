var express = require("express");
var router = express.Router();

const { putBlog,getBlogs,postBlog,deleteBlog,getBlogsById } = require("../controller/blogs");

router.get("/", getBlogs);
router.get("/:id", getBlogsById);
router.post("/", postBlog);
router.delete("/:id", deleteBlog);
router.put("/", putBlog);

module.exports = router;
