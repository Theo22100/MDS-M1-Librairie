class ReservationDTO {
    constructor({ id, reservation_date, User, Book }) {
      this.id = id;
      this.reservation_date = reservation_date;
      this.user = User ? {
        id: User.id,
        name: User.name,
        firstname: User.firstname,
        mail: User.mail,
      } : null;
      this.book = Book ? {
        id: Book.id,
        title: Book.title,
        author: Book.author,
        status: Book.status,
      } : null;
    }
  }
  
  module.exports = ReservationDTO;
  