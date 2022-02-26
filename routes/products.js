const express = require("express");
const router = express.Router();
const productsRepository = require("../data/products");
const verificarAdminRol = require("./verificarAdminRol");
const multer = require("multer")  
const fs = require('fs');


const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, '../front/src/assets')
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname)
   }
 })

const upload = multer({ storage: storage })

// GET Todos los productos
router.get("/", async (req, res) => {
    const data = await productsRepository.getAll();
    res.json(data);
 });

router.get("/:id", async (req, res) => {
   const productId = req.params.id;
   const data = await productsRepository.getById(productId);
   if(data){
      res.json(data);
   }else{
      res.status(404).send("NOT FOUND");
   }
   
}); 

 // Agregar un producto
router.post("/", [verificarAdminRol, upload.single('file')], async (req, res) => {

   const originalName = (req.file.originalname).toString()
   let product = req.body;
   product.img = originalName
   try {
      const result = await productsRepository.create(product);
      if(result.insertedCount == 1){
         res.status(200).send("El producto se agrego a productos");
      }else{
         res.status(500).send("Error al intentar agregar el producto");
      }
   } catch (error) {
      res.status(500).send(error);
   }

 });

 router.put("/:id", verificarAdminRol, async (req, res) => {
    const product = req.body;
    try {
       product._id = req.params.id;
       const result = await productsRepository.update(product);
       res.json(result);
    } catch (error) {
       res.status(500).json({error: error.message});
    }
 });


// Eliminacion de producto
router.delete("/:id", verificarAdminRol, async (req, res) => {
    try {
      const result = await productsRepository.removeById(req.params.id);
      res.json({"mensaje":"Se elimino el producto con ID: " + result});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
 });

 module.exports = router;
