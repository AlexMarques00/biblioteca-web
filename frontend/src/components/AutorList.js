import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { autorService } from '../services/api';

function AutorList() {
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');

  const carregarAutores = async () => {
    try {
      const response = await autorService.listar();
      setAutores(response.data);
      setErro('');
    } catch (err) {
      setErro('Erro ao carregar a lista de autores.');
    }
  };

  useEffect(() => {
    carregarAutores();
  }, []);

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja realmente excluir este autor?')) return;
    try {
      await autorService.deletar(id);
      carregarAutores();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErro(err.response.data);
      } else {
        setErro('Erro ao excluir autor. Verifique se ele possui livros cadastrados.');
      }
    }
  };

  return (
    <div>
      <div className="header-actions">
        <h2>Autores Cadastrados</h2>
        <Link to="/autores/novo" className="btn btn-primary">
          + Novo Autor
        </Link>
      </div>

      {erro && <div className="alert-error">{erro}</div>}

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nacionalidade</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {autores.length === 0 ? (
            <tr>
              <td colSpan="4">Nenhum autor cadastrado.</td>
            </tr>
          ) : (
            autores.map((autor) => (
              <tr key={autor.id}>
                <td>{autor.nome}</td>
                <td>{autor.nacionalidade || '-'}</td>
                <td>{autor.dataNascimento || '-'}</td>
                <td>
                  <Link to={`/autores/editar/${autor.id}`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button
                    onClick={() => handleExcluir(autor.id)}
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AutorList;