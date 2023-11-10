const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


//crear el servidor
const app = express();

//configurar el servidor
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.set('view engine', 'ejs')

//conexion a la base de datos
async function getConnection (){
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
    const conn = await getConnection();
    
    let queryMovies = '';
    if (genreFilter !== undefined && genreFilter!== "") {

     queryMovies = "SELECT * FROM movies WHERE genre = ? ORDER BY title ASC; ";
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
  
});

app.get('/movies/:id',async (req, res) =>{
  const filterId= req.params.id;
  console.log(filterId); 
  const query= "SELECT * FROM movies WHERE id_movies=? ";
  const connection = await getConnection();
  const [foundMovie] = await connection.query(query,[filterId] );
  console.log(foundMovie); 
  // res.json(results);
  res.render('movie', foundMovie[0]);
  connection.end();
 

} )

const pathServerStatic = "./src/public-react";
app.use(express.static(pathServerStatic));

const pathServerStaticImages = "./src/public-movies-images";
app.use(express.static(pathServerStaticImages));

const pathServerPublicStyles = './src/public-css';
app.use(express.static(pathServerPublicStyles));


// Endpoint para gestionar los errores 404
// app.get('*', (req, res) => {
// // Relativo a este directorio
//   const notFoundFileRelativePath = '../public/404-not-found.html';
//   const notFoundFileAbsolutePath = path.join(
//     __dirname,
//     notFoundFileRelativePath
//   );
//   res.status(404).sendFile(notFoundFileAbsolutePath);
// });

