import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import AutorList from './components/AutorList';
import AutorForm from './components/AutorForm';
import LivroList from './components/LivroList';
import LivroForm from './components/LivroForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h1>Biblioteca Web</h1>
        <div className="nav-links">
          <Link to="/autores">Autores</Link>
          <Link to="/livros">Livros</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/livros" replace />} />
          <Route path="/autores" element={<AutorList />} />
          <Route path="/autores/novo" element={<AutorForm />} />
          <Route path="/autores/editar/:id" element={<AutorForm />} />
          <Route path="/livros" element={<LivroList />} />
          <Route path="/livros/novo" element={<LivroForm />} />
          <Route path="/livros/editar/:id" element={<LivroForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;