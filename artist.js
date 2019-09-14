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
    return tracks;
  }

  ifContainsAlbum(albumId) {
    return this.albums.some( album => album.id === parseInt(albumId));
  } 

  isName(name) {
    return this.name.toLowerCase() === name.toLowerCase();  
  }

  deleteInfo() {
    this.albums.forEach(album => album.deleteInfo());
  }

  threeMostListenedTracks() {
    const tracksMostListened = this.getAllTracks().sort((t1,t2) => t2.getHeardTime() - t1.getHeardTime()).slice(0,3);
    const namesMostListened = tracksMostListened.map(track => track.name);
    console.log('This is ' + namesMostListened);
    return tracksMostListened;
  }

}

module.exports = Artist;