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

}

module.exports = Artist;