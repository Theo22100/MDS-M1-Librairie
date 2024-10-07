const Loan = require('../models/Loan');
const User = require('../models/User');
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');

// Récupérer liste emprunts
const listLoans = async (req, res) => {
    try {
      const loans = await Loan.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'firstname', 'mail'], 
          },
          {
            model: Book,
            attributes: ['id', 'title', 'author', 'status'], 
          },
        ],
      });
      res.status(200).json(loans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Obtenir infos emprunt spécifique
const getLoan = async (req, res) => {
    try {
      const { id } = req.params;
      const loan = await Loan.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'firstname', 'mail'],
          },
          {
            model: Book,
            attributes: ['id', 'title', 'author', 'status'],
          },
        ],
      });
  
      if (!loan) {
        return res.status(404).json({ error: 'Emprunt non trouvé' });
      }
  
      res.status(200).json(loan);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Ajouter un emprunt
const addLoan = async (req, res) => {
    try {
      const { userId, bookId } = req.body;
  
      // Vérifier si livre existe et dispo
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Livre non trouvé' });
      }
      if (book.status === 'borrowed') {
        return res.status(400).json({ error: 'Livre déjà emprunté' });
      }
  
      // Vérifier si user exist
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      // Créer emprunt avec userId et bookId
      const loan = await Loan.create({ userId: user.id, bookId: book.id, loan_date: new Date() });
  
      // MAJ statut livre en "borrowed"
      book.status = 'borrowed';
      await book.save();
  
      // Récupérer emprunt avec info user et livre
      const newLoan = await Loan.findByPk(loan.id, {
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'firstname', 'mail'],
          },
          {
            model: Book,
            attributes: ['id', 'title', 'author', 'status'],
          },
        ],
      });
  
      res.status(201).json({ message: 'Emprunt créé avec succès', loan: newLoan });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  
// Modifier emprunt
const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { return_date } = req.body;

    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }

    loan.return_date = return_date || loan.return_date;
    await loan.save();

    res.status(200).json({ message: 'Emprunt mis à jour avec succès', loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un emprunt
const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }

    await loan.destroy();
    res.status(200).json({ message: 'Emprunt supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Retourner un livre
const returnBook = async (req, res) => {
  try {
    const { loanId } = req.params;

    // Trouver emprunt actif
    const loan = await Loan.findByPk(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }

    // MAJ date retour
    loan.return_date = new Date();
    await loan.save();

    // MAJ statut livre pour verif reservation
    const book = await Book.findByPk(loan.bookId);
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }

    // Verif si reservation pour livre
    const nextReservation = await Reservation.findOne({
      where: { bookId: book.id },
      order: [['reservation_date', 'ASC']]
    });

    if (nextReservation) {
      // Si réservation existe, créer emprunt pour prochain user
      const newLoan = await Loan.create({
        userId: nextReservation.userId,
        bookId: book.id,
        loan_date: new Date(),
        return_date: null
      });

      // MAJ statut livre "borrowed"
      book.status = 'borrowed';
      await book.save();

      // Supprimer la réservation après avoir créé l'emprunt
      await nextReservation.destroy();

      res.status(200).json({
        message: 'Livre retourné et prêt attribué à la prochaine réservation',
        newLoan
      });
    } else {
      // Si aucune réservation, mettre livre available
      book.status = 'available';
      await book.save();

      res.status(200).json({ message: 'Livre retourné avec succès et est maintenant disponible' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listLoans,
  getLoan,
  updateLoan,
  deleteLoan,
  addLoan,
  returnBook
};
