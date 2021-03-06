const TheAlbumWithThatNameAlreadyExistException = require('./exceptions/theAlbumWithThatNameAlreadyExistException')

class Artist {

  constructor(id,name,country) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.albums = [];
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCountry() {
    return this.country;
  }
    
  getAlbums() {
    return this.albums;
  }

  addAlbum(album) {
    const repeatedAlbum = this.albums.find(a => a.name === album.name)
    if (repeatedAlbum) {
      throw new TheAlbumWithThatNameAlreadyExistException(album.name);
    } else {
      this.albums.push(album);
    }
  }

  removeAlbum(albumId) {
    this.albums = this.albums.filter( album => 
      album.id !== albumId    
    );
  }

  getAllTracks() {
    let tracks = new Array();
    this.albums.forEach(album => {
      tracks = new Array(...tracks,...album.tracks);
    });
    return tracks;
  }

  ifContainsAlbum(albumId) {
    return this.albums.some( album => album.id === albumId);
  } 

  isName(name) {
    return this.name.toLowerCase() === name.toLowerCase();  
  }

  deleteInfo() {
    this.albums.forEach(album => album.deleteInfo());
  }

  threeMostListenedTracks() {
    return this.getAllTracks().sort((t1,t2) => t2.getHeardTime() - t1.getHeardTime()).slice(0,3);
  }

}

module.exports = Artist;