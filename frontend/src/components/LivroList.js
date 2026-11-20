import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { livroService } from '../services/api';

function LivroList() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState('');

  const carregarLivros = async () => {
    try {
      const response = await livroService.listar();
      setLivros(response.data);
      setErro('');
    } catch (err) {
      setErro('Erro ao carregar a lista de livros.');
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja realmente excluir este livro?')) return;
    try {
      await livroService.deletar(id);
      carregarLivros();
    } catch (err) {
      setErro('Erro ao excluir livro.');
    }
  };

  return (
    <div>
      <div className="header-actions">
        <h2>Livros Cadastrados</h2>
        <Link to="/livros/novo" className="btn btn-primary">
          + Novo Livro
        </Link>
      </div>

      {erro && <div className="alert-error">{erro}</div>}

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Ano</th>
            <th>Gênero</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.length === 0 ? (
            <tr>
              <td colSpan="6">Nenhum livro cadastrado.</td>
            </tr>
          ) : (
            livros.map((livro) => (
              <tr key={livro.id}>
                <td>{livro.titulo}</td>
                <td>{livro.autor ? livro.autor.nome : '-'}</td>
                <td>{livro.isbn || '-'}</td>
                <td>{livro.anoPublicacao || '-'}</td>
                <td>{livro.genero || '-'}</td>
                <td>
                  <Link to={`/livros/editar/${livro.id}`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button
                    onClick={() => handleExcluir(livro.id)}
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

export default LivroList;