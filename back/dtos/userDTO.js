class UserDTO {
    constructor({ id, name, firstname, mail, admin }) {
      this.id = id;
      this.name = name;
      this.firstname = firstname;
      this.mail = mail;
      this.admin = admin;
    }
  }
  
  module.exports = UserDTO;
  