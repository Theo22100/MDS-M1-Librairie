class LoanDTO {
    constructor({ id, loan_date, return_date, User, Book }) {
      this.id = id;
      this.loan_date = loan_date;
      this.return_date = return_date;
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
  
  module.exports = LoanDTO;
  