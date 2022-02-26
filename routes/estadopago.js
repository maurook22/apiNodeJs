const express = require("express");
const router = express.Router();
const estadoPagosRepository = require("../data/EstadoPago");


// GET Todos los productos
router.get("/", async (req, res) => {
    try {
        const data = await estadoPagosRepository.getAll();
        res.json(data);
    } catch (error) {
        res.send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const estadoPagoId = req.params.id;
        const data = await estadoPagosRepository.getById(estadoPagoId);
        if (data) {
            res.json(data);
        } else {
            res.send("NOT FOUND");
        }
    } catch (error) {
        res.send(error);
    }

});


router.post("/", async (req, res) => {
    const estadoPago = req.body;
    try {
        const result = await estadoPagosRepository.create(estadoPago);
        if (result.insertedCount == 1) {
            res.send("estadoPago agregada");
        } else {
            res.send("Error al intentar agregar una estadoPago");
        }
    } catch (error) {
        res.send(error);
    }
});

router.put("/:id", async (req, res) => {
    const estadoPago = req.body;
    try {
        estadoPago._id = req.params.id;
        const result = await estadoPagosRepository.update(estadoPago);
        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const result = await estadoPagosRepository.removeById(req.params.id);
        res.json({ "mensaje": "Se elimino la categoria" });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
