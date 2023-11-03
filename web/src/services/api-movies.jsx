// login

const getMoviesFromApi = (params) => {
  console.log(params);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`http://localhost:4000/movies?genre=${params.genre}`)
    .then(response => response.json())
    .then((results) => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return results;
  });
};
const objToExport = {
getMoviesFromApi: getMoviesFromApi
};
export default objToExport;

