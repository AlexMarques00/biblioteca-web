import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { autorService, livroService } from '../services/api';

function LivroForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [isbn, setIsbn] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [genero, setGenero] = useState('');
  const [autorId, setAutorId] = useState('');
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    autorService
      .listar()
      .then((res) => setAutores(res.data))
      .catch(() => setErro('Erro ao carregar autores disponíveis.'));

    if (id) {
      livroService
        .buscar(id)
        .then((res) => {
          const livro = res.data;
          setTitulo(livro.titulo || '');
          setIsbn(livro.isbn || '');
          setAnoPublicacao(livro.anoPublicacao || '');
          setGenero(livro.genero || '');
          setAutorId(livro.autor ? String(livro.autor.id) : '');
        })
        .catch(() => setErro('Livro não encontrado.'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!autorId) {
      setErro('Selecione um autor para o livro.');
      return;
    }

    const payload = {
      titulo,
      isbn: isbn || null,
      anoPublicacao: anoPublicacao ? Number(anoPublicacao) : null,
      genero: genero || null,
      autor: { id: Number(autorId) },
    };

    try {
      if (id) {
        await livroService.atualizar(id, payload);
      } else {
        await livroService.criar(payload);
      }
      navigate('/livros');
    } catch (err) {
      setErro('Erro ao salvar livro. Verifique os dados informados.');
    }
  };

  return (
    <div>
      <div className="header-actions">
        <h2>{id ? 'Editar Livro' : 'Novo Livro'}</h2>
      </div>

      {erro && <div className="alert-error">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            maxLength={200}
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex.: Dom Casmurro"
          />
        </div>

        <div className="form-group">
          <label>Autor *</label>
          <select
            required
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
          >
            <option value="">Selecione um autor...</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            maxLength={20}
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Ex.: 978-8535910667"
          />
        </div>

        <div className="form-group">
          <label>Ano de Publicação</label>
          <input
            type="number"
            value={anoPublicacao}
            onChange={(e) => setAnoPublicacao(e.target.value)}
            placeholder="Ex.: 1899"
          />
        </div>

        <div className="form-group">
          <label>Gênero</label>
          <input
            type="text"
            maxLength={50}
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Ex.: Romance"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        <Link to="/livros" className="btn btn-secondary">
          Cancelar
        </Link>
      </form>
    </div>
  );
}

export default LivroForm;