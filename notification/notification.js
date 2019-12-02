const gmailTool = require('./gmail-tools/send-mail-example/sendMail');

class Notification {

  constructor() {
    this.suscribers = {};
  }

  suscribe(artistId, email) {
    artistId in this.suscribers ? this.addIfNotExist(email,artistId) : this.suscribers[artistId] = [email];
  }

  unsuscribe(artistId, email) {
    this.suscribers[artistId] = this.suscribers[artistId].filter(e => e != email);
  }

  addIfNotExist(email, artistId) {
    const list = this.suscribers[artistId];
    if (!list.includes(email)) {
      list.push(email);
    }
    this.suscribers[artistId] = list;
  }

  deleteArtist(artistId) {
    delete this.suscribers[artistId];
  }

  notify(artistId, subject, message) {
    this.suscribers[artistId].forEach(email => {
      gmailTool.sendEmail(subject, message, email);
    });
  }

  getEmails(artistId) {
    return this.suscribers[artistId];
  }

}
module.exports = Notification;