const _addArtist = (params, unqfy) => {
  const artist = unqfy.addArtist({name: params[1], country: params[2]});
  console.log(artist);
};

const _addAlbum = (params, unqfy) => {
  const album = unqfy.addAlbum(parseInt(params[1]), {name: params[2], year: params[3]});
  console.log(album);
};

const _addTrack = (params, unqfy) => {
  const track = unqfy.addTrack(parseInt(params[1]), {name: params[2], duration: params[3], genres: params.slice(4)});
  console.log(track);
};

const _removeTrack = (params, unqfy) =>{
  unqfy.removeTrack(parseInt(params[1]));
};

const _removeAlbum = (params, unqfy) =>{
  unqfy.removeAlbum(parseInt(params[1]));
};

const _removeArtist = (params, unqfy) =>{
  unqfy.removeArtist(parseInt(params[1]));
  console.log(unqfy.artists);
};

const _getArtist = (params, unqfy) => {
  const artist = unqfy.getArtistById(parseInt(params[1]));
  console.log(artist);
};

const _getAlbum = (params, unqfy) => {
  const album = unqfy.getAlbumById(parseInt(params[1]));
  console.log(album);
};

const _getTrack = (params, unqfy) => {
  const track = unqfy.getTrackById(parseInt(params[1]));
  console.log(track);
};

const _allArtists = (params, unqfy) => {
  const artists = unqfy.artists;
  console.log(artists);
};

const _allAlbumsByArtist = (params, unqfy) => {
  const albumsByArtist = unqfy.getAlbumsByArtist(parseInt(params[1]));
  console.log(albumsByArtist);
};

const _allTracksByAlbum = (params, unqfy) => {
  const tracksByAlbum = unqfy.getTracksByAlbum(parseInt(params[1]));
  console.log(tracksByAlbum);
};

const _tracksMatchingArtist = (params, unqfy) => {
  const artist = unqfy.getArtistById(parseInt(params[1]));
  const tracks = unqfy.getTracksMatchingArtist(artist);
  console.log(tracks);
};

const _tracksMatchingGenres = (params, unqfy) => {
  const tracks = unqfy.getTracksMatchingGenres(params.slice(1));
  console.log(tracks);
};

const _createPlaylist = (params, unqfy) => {
  const playlist = unqfy.createPlaylist(params[1],params[2],parseInt(params[3]));
  console.log(playlist);
};

const _addUser = (params, unqfy) => {
  const user = unqfy.addUser(params[1]);
  console.log(user);
};

const _getUser = (params, unqfy) => {
  const user = unqfy.getUser(parseInt(params[1]));
  console.log(user);
};

const _hear = (params, unqfy) => {
  const user = unqfy.getUser(parseInt(params[1]));
  const track = unqfy.getTrackById(params[2]);
  user.listenTrack(track);
};

const _tracksHeard = (params, unqfy) => {
  const user = unqfy.getUser(parseInt(params[1]));
  const tracks = user.getTracksHeard();
  console.log(tracks);
};

const _timesHeard = (params, unqfy) => {
  const user = unqfy.getUser(parseInt(params[1]));
  const times = user.manyTimesListenTrack(params[2]);
  console.log(times);
};

const _tracksMostListened = (params, unqfy) => {
  const artist = unqfy.getArtistById(parseInt(params[1]));
  const tracks = artist.threeMostListenedTracks();
  console.log(tracks);
};

const _getPlaylist = (params, unqfy) => {
  const playlist = unqfy.getPlaylistById(parseInt(params[1]));
  console.log(playlist);
};

const _searchByName = (params, unqfy) =>{
  const contains = unqfy.searchByName(params[1]);
  console.log(contains);
};

const _getLyricsByTrackName = (params, unqfy) =>{
  unqfy.getLyricsByTrackName(params[1]);
  
};

const _populateAlbumsForArtist = (params, unqfy) => {
  unqfy.populateAlbumsForArtist(params[1]);
};

const _getAlbumsForArtist = (params, unqfy) => {
  const albums = unqfy.getAlbumsForArtist(params[1]);
  console.log(albums);
}

const _help = () => {
  console.log('- addArtist [nombre] [nacionalidad] :  Agrega un artista con su nombre y nacionalidad');
  console.log('- addTrack [albumID] [track Name] [genero1] [genero2] [genero3] ...  : Agrega un track al album ');
  console.log('- addAlbum [artistID] [album Name] [album Year] : Agrega un album');
  console.log ('- removeArtist [artistID] : borra el artista');
  console.log ('- removeAlbum [albumID] : borra el album');
  console.log ('- removeTrack [trackID] : borra la cancion');
  console.log('- searchByName [name]: busca tracks, artistas, playlist y albums por el nombre');
  console.log ('- getArtist [artistID] : muestra un artista');
  console.log ('- getAlbum [albumID] : muestra un album');
  console.log ('- getTrack [trackID] : muestra un track');
  console.log('- allArtists : Lista todos los artistas');
  console.log('- allAlbumsByArtist [artistID] : lista todos los albums del artista');
  console.log ('- allTracksByAlbum [albumID] : lista todos los tracks de un album');
  console.log ('- tracksMatchingArtist [artistId] : lista las canciones de un artista');
  console.log ('- tracksMatchingGenres [lista de generos] : lista los tracks que pertenecen a esa lista de generos');
  console.log ('- createPlaylist [nombre] [lista de generos] [maxima duracion] : crea una playlist con una duracion maxima');
  console.log ('- addUser [nombre] : agrega un usuario a unqfy');
  console.log ('- getUser [userID] : muestra a un usuario de unqfy');
  console.log ('- hear [userID] [trackID] : se agrega un track a un usuario como escuchado');
  console.log ('- tracksHeard [userID] : lista las canciones escuchadas de un usuario');
  console.log ('- timesHeard [userID] [trackID] : muestra la cantidad de veces que un usuario escucho un track');
  console.log ('- tracksMostListened [artistID] : lista los 3 tracks mas escuchados de un artista');
  console.log ('- getPlaylist [playlistID] : muestra una playlist');
};


const commands = {
  addArtist  : _addArtist,
  addTrack : _addTrack,
  addAlbum : _addAlbum,
  removeArtist : _removeArtist,
  removeAlbum : _removeAlbum,
  removeTrack : _removeTrack,
  searchByName : _searchByName,
  getArtist : _getArtist,
  getAlbum : _getAlbum,
  getTrack : _getTrack,
  allArtists: _allArtists,
  allAlbumsByArtist: _allAlbumsByArtist,
  allTracksByAlbum: _allTracksByAlbum,
  tracksMatchingArtist: _tracksMatchingArtist,
  tracksMatchingGenres: _tracksMatchingGenres,
  createPlaylist: _createPlaylist,
  addUser: _addUser,
  getUser: _getUser,
  hear: _hear,
  tracksHeard: _tracksHeard,
  timesHeard: _timesHeard,
  tracksMostListened: _tracksMostListened,
  getPlaylist: _getPlaylist,
  getLyricsByTrackName : _getLyricsByTrackName,
  populateAlbumsForArtist : _populateAlbumsForArtist,
  getAlbumsForArtist : _getAlbumsForArtist,
  helps: _help,
};


function execute(params, unqfy){
  const posibleComando = params[0];
  (posibleComando in commands) ? commands[posibleComando](params, unqfy) : console.log('No existe el comando dado');
  const promise = new Promise((resolve, reject) => {
    setTimeout(
      () =>  resolve(),
      1000
    );
  });
  return promise;
}


module.exports = {
  execute
};