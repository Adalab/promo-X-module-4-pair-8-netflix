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
  const genreFilter = req.query.genre
  console.log (genreFilter)

  //obteber los datos de la base de datos
    //1. obtener conexion  
    const conn = await getConnetion();
    
    let queryMovies = '';
    if (genreFilter !== undefined) {

     queryMovies = "SELECT * FROM movies WHERE genre = ? && ORDER BY title ASC ";
     const [results] = await conn.query(queryMovies, [req.query.genre])
     conn.end();
     res.json({
      success: true,
      movies:  results
    });

    }else {
      queryMovies = "SELECT * FROM movies";
      const [results] = await conn.query(queryMovies)
      conn.end();
      res.json({
       success: true,
       movies:  results
     });

    }
  
    app.get('/id',async (req, res) =>{
      const filterId= req.query.id_movies;
      const query= "SELECT * FROM movies WHERE id_movies=? ";
      const Id = req.query.id_movies;
      const connection = await getConnection();
      const [results] = await connection.query(query,[filterId, Id] );
      res.json(results);
      connection.end();
     
  
  } )
  
});

const pathServerStatic = "./src/public-react";
app.use(express.static(pathServerStatic));

const pathServerStaticImages = "./src/public-movies-images";
app.use(express.static(pathServerStaticImages));

// Endpoint para gestionar los errores 404
app.get('*', (req, res) => {
// Relativo a este directorio
  const notFoundFileRelativePath = '../public/404-not-found.html';
  const notFoundFileAbsolutePath = path.join(
    __dirname,
    notFoundFileRelativePath
  );
  res.status(404).sendFile(notFoundFileAbsolutePath);
});

