/* Permet d'être réutiliser plus pour TODO MODIF INFO LIVRES */
const BookForm = ({ bookData, setBookData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Titre</label>
        <input
          type="text"
          name="title"
          className="form-control"
          id="title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">Auteur</label>
        <input
          type="text"
          name="author"
          className="form-control"
          id="author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Statut</label>
        <select
          name="status"
          className="form-select"
          id="status"
          value={bookData.status}
          onChange={handleChange}
        >
          <option value="available">Disponible</option>
          <option value="borrowed">Emprunté</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Ajouter</button>
    </form>
  );
};

export default BookForm;
