import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksPage from '../pages/BooksPage';
import LoansPage from '../pages/LoansPage';
import ReservationsPage from '../pages/ReservationsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
