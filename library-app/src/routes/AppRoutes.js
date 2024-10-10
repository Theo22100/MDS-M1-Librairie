import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksPage from '../pages/BooksPage';
import LoansPage from '../pages/LoansPage';
import ReservationsPage from '../pages/ReservationsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Header from '../components/Header/header';
import AdminPage from '../pages/AdminPage';

import AdminRoute from './AdminRoute'
import PrivateRoute from './privateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<PrivateRoute element={BooksPage} />} />
        <Route path="/loans" element={<PrivateRoute element={LoansPage} />} />
        <Route path="/reservations" element={<PrivateRoute element={ReservationsPage} />} />
        
        {/* Route admin, protégée par AdminRoute */}
        <Route path="/admin" element={<AdminRoute element={AdminPage} />} />

        {/* Route catch-all qui redirige vers /home si l'utilisateur est connecté, sinon /login */}
        <Route path="*" element={<PrivateRoute element={BooksPage} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
