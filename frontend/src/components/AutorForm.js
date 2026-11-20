import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { autorService } from '../services/api';

function AutorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      autorService
        .buscar(id)
        .then((response) => {
          const autor = response.data;
          setNome(autor.nome || '');
          setNacionalidade(autor.nacionalidade || '');
          setDataNascimento(autor.dataNascimento || '');
        })
        .catch(() => setErro('Autor não encontrado.'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nome,
      nacionalidade: nacionalidade || null,
      dataNascimento: dataNascimento || null,
    };

    try {
      if (id) {
        await autorService.atualizar(id, payload);
      } else {
        await autorService.criar(payload);
      }
      navigate('/autores');
    } catch (err) {
      setErro('Erro ao salvar autor. Verifique os campos obrigatórios.');
    }
  };

  return (
    <div>
      <div className="header-actions">
        <h2>{id ? 'Editar Autor' : 'Novo Autor'}</h2>
      </div>

      {erro && <div className="alert-error">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome *</label>
          <input
            type="text"
            maxLength={100}
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Machado de Assis"
          />
        </div>

        <div className="form-group">
          <label>Nacionalidade</label>
          <input
            type="text"
            maxLength={50}
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
            placeholder="Ex.: Brasileira"
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        <Link to="/autores" className="btn btn-secondary">
          Cancelar
        </Link>
      </form>
    </div>
  );
}

export default AutorForm;