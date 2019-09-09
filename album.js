class Album {

    constructor(id,name,year,artist) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.artist = artist;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getYear() {
        return this.year;
    }

    getArtist() {
        return this.artist;
    }

}

module.exports = Album;