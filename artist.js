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
    this.albums.push(album);
  }

  removeAlbum(albumId) {
    this.albums = this.albums.filter( album => 
      album.id !== parseInt(albumId)    
    );
  }

  getAllTracks() {
    let tracks = new Array();
    this.albums.forEach(album => {
      tracks = new Array(...tracks,...album.tracks);
    });
    const uniqueTracks = new Set(tracks);
    return Array.from(uniqueTracks);
  }

}

module.exports = Artist;