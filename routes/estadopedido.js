const express = require("express");
const router = express.Router();
const estadoPedidosRepository = require("../data/EstadoPedido");


// GET Todos los productos
router.get("/", async (req, res) => {
   try {
      const data = await estadoPedidosRepository.getAll();
      res.json(data);
   } catch (error) {
      res.send(error);
   }
});

router.get("/:id", async (req, res) => {
   const estadoPedidoId = req.params.id;
   try {
      const data = await estadoPedidosRepository.getById(estadoPedidoId);
      if (data) {
         res.json(data);
      } else {
         res.status(404).send("NOT FOUND");
      }
   } catch (error) {
      res.send(error);
   }
});


router.post("/", async (req, res) => {
   const estadoPedido = req.body;
   try {
      const result = await estadoPedidosRepository.create(estadoPedido);
      if (result.insertedCount == 1) {
         res.status(201).send("estadoPedido agregada");
      } else {
         res.status(500).send("Error al intentar agregar una estadoPedido");
      }
   } catch (error) {
      res.status(500).send(error);
   }
});

router.put("/:id", async (req, res) => {
   const estadoPedido = req.body;
   try {
      estadoPedido._id = req.params.id;
      const result = await estadoPedidosRepository.update(estadoPedido);
      res.json(result);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});


router.delete("/:id", async (req, res) => {
   try {
      const result = await estadoPedidosRepository.removeById(req.params.id);
      res.json({ "mensaje": "Se elimino la categoria" });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

module.exports = router;
