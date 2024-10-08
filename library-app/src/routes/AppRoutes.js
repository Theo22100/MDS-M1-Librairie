import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BooksPage from '../pages/BooksPage';
import LoansPage from '../pages/LoansPage';
import ReservationsPage from '../pages/ReservationsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PrivateRoute from './privateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<PrivateRoute component={BooksPage} />} />
        <Route path="/loans" element={<PrivateRoute component={LoansPage} />} />
        <Route path="/reservations" element={<PrivateRoute component={ReservationsPage} />} />
        <Route
          path="*"
          element={
            <PrivateRoute
              element={<Navigate to="/home" />} // Si connecté, home
              fallback={<Navigate to="/login" />} // Sinon, login
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

