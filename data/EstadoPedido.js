const { Connection } = require("../data/mongo-connection");

async function getAll() {
   const estadopedidos = await Connection.db.db("ecommerce").collection("estadopedido").find().toArray();
   return estadopedidos;
}

async function create(estadopedido) {
   const resultado = await Connection.db.db("ecommerce").collection("estadopedido").insertOne(estadopedido);
   return resultado;
}

async function update(estadopedido) {
   const query = { id: parseInt(estadopedido._id) };
   const newValues = {
      $set: {
         descripcion: estadopedido.descripcion,
      },
   };
   const commandResult = await Connection.db.db("ecommerce").collection("estadopedido").updateOne(query, newValues);
   if (commandResult.result.n != 1) {
      throw new Error("No se actualizo el estadopedido");
   }
   return estado;
}

async function removeById(id) {
   const result = await Connection.db
      .db("ecommerce")
      .collection("estadopedido")
      .deleteOne({ id: parseInt(id) });
   if (result.deletedCount != 1) {
      throw new Error("No se elimino la categoria");
   }
   return id;
}

async function getById(id) {
   const idPorParametro = parseInt(id);
   const estadopedido = await Connection.db.db("ecommerce").collection("estadopedido").findOne({ id: idPorParametro });
   return estadopedido;
}

module.exports = { getAll, create, update, removeById, getById };
