const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

//crear el servidor
const app = express();

//configurar el servidor
app.use(cors());
app.use(express.json({ limit: '25mb' }));

//conexion a la base de datos
async function getConnetion (){
  //crear y configurar conexion
const connection = await mysql.createConnection({
  host:"localhost",
  user: "root",
  password: "Taniamoreno1991",
  database: "netflix"
});
connection.connect();
return connection;
};
//iniciar el servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

//endpoint para todas las peliculas
app.get('/movies', async (req, res) => {
  //require para cuando envien datos
  //response para enviar desde el server datos al front
  console.log(req.query.genre);
  //obteber los datos de la base de datos
    //1. obtener conexion  
    const conn = await getConnetion();
    //2. consulta que quiero a la bd: obtener todas las alumnas
    const queryMovies = "SELECT * FROM movies WHERE genre = req.query.genre";
    //3. ejecutar consulta
    const [results] = await conn.query(queryMovies);

    //4. cerrar conexion
    conn.end();


  res.json({
    success: true,
    movies:  results
  });
});

