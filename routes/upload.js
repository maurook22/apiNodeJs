const express = require("express");
const router = express.Router();
const multer = require("multer")

const upload = multer({
    dest: './uploads'
})

// Agregar un pedidoo
router.post("/", upload.single('file'), async (req, res) => {

    res.json({ file: req.file })

});

module.exports = router;
