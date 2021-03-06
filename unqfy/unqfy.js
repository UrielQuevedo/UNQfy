
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Track = require('./track');
const Artist = require('./artist');
const Album = require('./album');
const Playlist = require('./playlist');
const User = require('./user');
const UserExist = require('./exceptions/userExist');
const UserNotFound = require('./exceptions/userNotFound');
const PlaylistNotFound = require('./exceptions/playlistNotFound');
const TrackNotFound = require('./exceptions/trackNotFound');
const TrackNotFoundId = require('./exceptions/trackNotFoundId')
const NonExistentArtistException = require('./exceptions/nonexistentartistexception');
const NonExistentAlbumException = require('./exceptions/nonexistentalbumexception');
const NonExistentArtistAlbumException = require('./exceptions/nonExistentArtistAlbumException');
const TheArtistWithThatNameAlreadyExistsException = require('./exceptions/theartistwiththatnamealreadyexistsexception');
const IdGenerator = require('./idGenerator');
const spotifyAPI = require('./spotifyAPI');
const rp = require('request-promise');
const NotifyLog = require('./notifyLog');
const NotifyNotification = require('./notifyNotification');
const notifyLog = new NotifyLog();
const notifyNotification = new NotifyNotification();

class UNQfy {

  constructor() {
    this.idGenerator = new IdGenerator();
    this.artists = [];
    this.playlists = [];
    this.users = [];
    this.observers = [];
    this.addObserver(notifyLog);
    this.addObserver(notifyNotification);
  }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    const newArtist = new Artist(this.idGenerator.generateId(),artistData.name, artistData.country);
    this.checkIfThereIsAnArtistWithThatName(artistData.name);
    this.artists.push(newArtist);
    return newArtist;
  }


  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
      - una propiedad name (string)
      - una propiedad year (number)
  */
    const artist = this.searchElementById(this.artists, artistId);
    if(artist === undefined) {
      throw new NonExistentArtistAlbumException(artistId);
    }
    const newAlbum = new Album(this.idGenerator.generateId(), albumData.name, albumData.year);
    artist.addAlbum(newAlbum);
    return newAlbum;
  }


  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
    const album = this.getAlbumById(albumId);
    const newTrack = new Track(this.idGenerator.generateId(), trackData.name, trackData.duration, trackData.genres);
    album.addTrack(newTrack);
    return newTrack;
  }

  addUser(name) {
    const user = new User(this.idGenerator.generateId(), name);
    this.checkUserName(name);
    this.users.push(user);
    return user;
  }

  checkUserName(name) {
    const user = this.users.find(user => user.name === name);
    if(user !== undefined) {
      throw new UserExist(name);
    }
  }

  getUser(userId) {
    const user = this.users.find( user => user.id === (userId));
    if(user === undefined) {
      throw UserNotFound(user.name);
    }
    return user;
  }

  searchElementById(list, id) {
    return list.find(elem => 
      elem.id === id
    );
  }

  checkIfThereIsAnArtistWithThatName(artistName) {
    const artist = this.artists.find(artist => artist.name === artistName);
    if(artist !== undefined) {
      throw new TheArtistWithThatNameAlreadyExistsException(artistName);
    }
  }

  getArtistById(id) {
    const element = this.searchElementById(this.artists, id);
    if(element === undefined) {
      throw new NonExistentArtistException(id);
    } 
    return element;
  }

  getAlbumById(id) { 
    const element = this.searchElementById(this.getAllAlbums(), id);
    if(element === undefined) {
      throw new NonExistentAlbumException(id);
    }
    return element;
  }

  getAllArtist() {
    return this.artists;
  }

  getAllAlbums() {
    let albums = [];
    this.artists.forEach( artist => 
      albums = albums.concat(artist.albums)
    );
    return albums;
  }

  getTrackById(id) {
    const albums = this.getAllAlbums();
    const album = albums.find(album => 
      album.ifContainsTrack(id)
    );
    if (album === undefined) {
      throw new TrackNotFoundId(id);
    }
    return album.getTrack(id);
  }

  removeTrack(trackId) {
    const album = this.getAllAlbums().find(album =>album.ifContainsTrack(trackId));
    const track = this.getTrackById(trackId);
    track.deleteInfo();
    album.removeTrack(trackId);
  }

  removeAlbum(albumId) {
    const artist = this.artists.find(artist => artist.ifContainsAlbum(albumId));
    const album = this.getAlbumById(albumId);
    album.deleteInfo();
    artist.removeAlbum(albumId);
  }

  removeUser(userId) {
    this.getUser(userId);
    this.users = this.users.filter(user => user.id !== userId);
  }

  removeArtist(artistId) {
    const artistToDelete = this.getArtistById(artistId);
    this.artists = this.artists.filter( artist =>
      artist.id !== (artistId)
    );
    artistToDelete.deleteInfo();
  }

  getAlbumsByArtist(artistId) { return this.getArtistById(artistId).albums; }

  getTracksByAlbum(albumId) { return this.getAlbumById(albumId).tracks; }

  getPlaylistById(id) { 
    const playlist = this.searchElementById(this.playlists, id);
    if (playlist === undefined) {
      throw new PlaylistNotFound(id);
    }
    return playlist; 
  }

  getListByName(list, name) { return list.filter( elem => elem.name.toLowerCase().includes(name)); }

  getAllTracks() {
    let tracks = [];
    this.artists.forEach(artist => {
      tracks = tracks.concat(this.getTracksMatchingArtist(artist));
    });
    return tracks;
  }

  searchByName(name) {
    return {
      artists: this.getListByName(this.artists, name),
      albums: this.getListByName(this.getAllAlbums(), name),
      tracks: this.getListByName(this.getAllTracks(), name),
      playlists: this.getListByName(this.playlists, name)
    };
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    let tracks = [];
    this.getAllAlbums().forEach( album => {
      const tracksByGenere = album.getTracksByGenres(genres);
      tracks = tracks.concat(tracksByGenere);
    });
    return tracks;
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(_artist) {
    const artist = this.artists.find( artist => 
      artist.isName(_artist.name)
    );
    return artist.getAllTracks();
  }

  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
    const newPlaylist = new Playlist(this.idGenerator.generateId(), name, genresToInclude, maxDuration);
    const tracksMatchByGenres = this.getTracksMatchingGenres(genresToInclude);
    tracksMatchByGenres.forEach(track => newPlaylist.addTrack(track));
    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  searchAlbums(albumsName){
    const albums = this.getAllAlbums();
    return albums.filter(album => album.name.toLowerCase().includes(albumsName.toLowerCase()));
  }

  getTrackByName(name) {
    const track = this.getAllTracks().find(track => track.name === name);
    if(track === undefined) {
      throw new TrackNotFound(name);
    }
    return track;
  }

  getLyricsByTrackName(trackName) {
    const track = this.getTrackByName(trackName);
    track.getLyrics().then((response) => {
      const header = response.message.header;
      const body = response.message.body;
      if (header.status_code !== 200){
        throw new Error('status code != 200');
      }
      const lyrics = body.lyrics.lyrics_body;
      console.log(lyrics);
      return lyrics;
    });
  }

  populateAlbumsForArtist(artistName) {
    spotifyAPI.searchArtist(artistName)
      .then((response) => {
        return response.artists.items[0].id;
      })
      .then((id) => {
        this.addSpotifyAlbumsById(id, this.getOrCreateArtist(artistName));
      })
      .catch((error) => console.log('There was an error', error));
  }

  addSpotifyAlbumsById(spotifyId, artist) {
    spotifyAPI.getAlbumsById(spotifyId)
      .then((albums) => {
        albums.items.forEach(a => {
          artist.albums.push(new Album(a.id, a.name, a.release_date))
        });
      })
      .catch((error) => console.log('There was an error', error));
  }

  getOrCreateArtist(artistName) {
    let artist = this.artists.find(a => a.name === artistName);
    if (artist === undefined) {
      const data = {
        name: artistName, 
        country: '',
      };
      artist = this.addArtist(data);
    }
    return artist;
  }

  getAlbumsForArtist(artistName) {
    const artist = this.artists.find(a => a.name === artistName);
    if(artist === undefined) {
      throw new NonExistentArtistException(artistName);
    } 
    return artist.albums;
  }

  removePlayList(playlistId) {
    this.playlists = this.playlists.filter(p => p.id !== playlistId);
  }

  createPlaylistByTracks(name, tracksId) {
    const tracks = tracksId.map( id => {
      const track = this.getTrackById(id);
      if (track === undefined) {
        throw new TrackNotFoundId(id);
      }
      return track;
    });
    const playlist = new Playlist(this.idGenerator.generateId(), name, [], 0);
    playlist.tracks = tracks;
    playlist.maxDuration = tracks.reduce((t, x) => t.duration + x, 0);
    tracks.forEach(t => t.suscribeToPlayList(playlist));
    return playlist;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyAllObservers(object) {
    this.observers.forEach(observer => observer.notify(object));
  }

  notifyAllObserversAddAlbum(artist, name) {
    this.observers.forEach(observer => observer.notifyAddAlbum(artist, name));
  }

  save(filename) {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Album, Track, Playlist, User, IdGenerator, NotifyLog, NotifyNotification];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

