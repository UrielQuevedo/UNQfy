

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {
  const params = process.argv.slice(2);
  const unqfy = getUNQfy('database');

  switch (params[0])
  {
  case 'addArtist':{
    unqfy.addArtist({name: params[1], country: params[2]});
    console.log(unqfy.artists);
    break;
  } 

  case 'addAlbum':{
    unqfy.addAlbum(params[1], {name: params[2], year: params[3]});
    console.log(unqfy.getAlbumById(params[1]));
    break;
  } 

  case 'addTrack':{
    const track = unqfy.addTrack(params[1], {name: params[2], duration: params[3], genres: params[4]});
    console.log(track);
    break;
  }
  case 'removeArtist':{
    unqfy.removeArtist(params[1]);
    console.log(unqfy.artists);
    break;
  } 

  case 'removeAlbum':{
    unqfy.removeAlbum(params[1]);
    break;
  } 

  case 'removeTrack':{
    unqfy.removeTrack(params[1]);
    break;
  }

  case 'allArtists': {
    const artists = unqfy.artists;
    console.log(artists);
    break;
  }

  case 'allAlbumsByArtist': {
    const albumsByArtist = unqfy.getAlbumsByArtist(params[1]);
    console.log(albumsByArtist);
    break;
  }

  case 'allTracksByAlbum': {
    const tracksByAlbum = unqfy.getTracksByAlbum(params[1]);
    console.log(tracksByAlbum);
    break;
  }

  default:{
    console.log('No existe el comando dado');
  }
  }

  saveUNQfy(unqfy,'database');
}

main();
