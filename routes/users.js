const express = require("express");
const router = express.Router();
const userRepository = require("../data/user");
const jwt = require("jsonwebtoken");
const config = require("../config");

router.post("/login", async (req, res, next) => {
   const { email, password } = req.body;
   const user = await userRepository.getByEmail(email);

   if (!user) {
      return res.send('No existe usuario');
   }
   const passValida = await userRepository.validarPasswordBcrypt(email, password);

   if (!passValida) {
      return res.send('Contraseña incorrecta');
   }

   const token = jwt.sign({ id: user._id, rol: user.rol }, config.secret, { expiresIn: "7d" });
   res.json({ token: token });

});

router.post("/signin", async (req, res, next) => {
   const { email } = req.body;
   const userEnBase = await userRepository.getByEmail(email);
   const user = req.body;
   user.rol = "customer";
   const fecha = new Date()
   user.createdAt = fecha.toLocaleDateString()

   if (userEnBase != null) {
      res.send("Este usuario ya existe");
   } else {
      try {
         await userRepository.create(user);
         res.json({ estado: "registro exitoso", user: user });
      } catch (error) {
         res.send(error);
      }
   }
});

router.get("/:id", async (req, res) => {
   const userId = req.params.id;
   const data = await userRepository.getById(userId);
   res.json(data);
});

module.exports = router;
