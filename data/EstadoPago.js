const { Connection } = require("../data/mongo-connection");


async function getAll() {
   const estadopagos = await Connection.db.db("ecommerce").collection("estadopago").find().toArray();
   return estadopagos;
}

async function create(estadopago) {
   const resultado = await Connection.db.db("ecommerce").collection("estadopago").insertOne(estadopago);
   return resultado;
}

async function update(estadopago) {
   const query = { id: parseInt(estadopago._id) };
   const newValues = {
      $set: {
         descripcion: estadopago.descripcion,
      },
   };
   const commandResult = await Connection.db.db("ecommerce").collection("estadopago").updateOne(query, newValues);
   if (commandResult.result.n != 1) {
      throw new Error("No se actualizo el estadopago");
   }
   return estado;
}

async function removeById(id) {
   const result = await Connection.db
      .db("ecommerce")
      .collection("estadopago")
      .deleteOne({ id: parseInt(id) });
   if (result.deletedCount != 1) {
      throw new Error("No se elimino la categoria");
   }
   return id;
}

async function getById(id) {
   const idPorParametro = parseInt(id);
   const estadopago = await Connection.db.db("ecommerce").collection("estadopago").findOne({ id: idPorParametro });
   return estadopago;
}

module.exports = { getAll, create, update, removeById, getById };
