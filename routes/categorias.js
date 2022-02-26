const express = require("express");
const router = express.Router();
const categoriasRepository = require("../data/categoria");


// GET Todos los productos
router.get("/", async (req, res) => {
    const data = await categoriasRepository.getAll();
    res.json(data);
 });

router.get("/:id", async (req, res) => {
   const categoriaId = req.params.id;
   const data = await categoriasRepository.getById(categoriaId);
   if(data){
      res.json(data);
   }else{
      res.status(404).send("NOT FOUND");
   }
   
}); 

 // Agregar un producto
router.post("/", async (req, res) => {
    const categoria = req.body;
    try {
       const result = await categoriasRepository.create(categoria);
       if(result.insertedCount == 1){
          res.status(201).send("Categoria agregada");
       }else{
          res.status(500).send("Error al intentar agregar una categoria");
       }
    } catch (error) {
       res.status(500).send(error);
    }
 });

 router.put("/:id", async (req, res) => {
    const categoria = req.body;
    try {
       categoria._id = req.params.id;
       const result = await categoriasRepository.update(categoria);
       res.json(result);
    } catch (error) {
       res.status(500).json({error: error.message});
    }
 });


// Eliminacion de producto
router.delete("/:id", async (req, res) => {
    try {
       const result = await categoriasRepository.removeById(req.params.id);
       res.json({"mensaje":"Se elimino la categoria"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
 });

 module.exports = router;
