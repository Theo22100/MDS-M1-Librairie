require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db');

// Importer modèles pour BDD
const Book = require('./models/Book');
const User = require('./models/User');
const Loan = require('./models/Loan');
const Reservation = require('./models/Reservation');

// Routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger documentation
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Librairy API',
            version: '1.0.0',
            description: 'API pour gérer les utilisateurs et les livres',
        },
    },
    apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configurer routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/reservations', reservationRoutes);

// Gestion erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Soucis !' });
});

// Exporter `app` pour les tests
module.exports = app;

// Démarrer le serveur seulement si le fichier est exécuté directement
if (require.main === module) {
  sequelize.authenticate()
    .then(() => {
      console.log('Connexion BDD réussie.');
      return sequelize.sync({ force: false });
    })
    .then(() => {
      console.log('Database & tables créés !');
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Serveur lancé sur le PORT ${PORT}`));
    })
    .catch((err) => {
      console.error('Impossible de se co BDD :', err);
    });
}
