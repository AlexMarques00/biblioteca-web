package com.biblioteca.controller;

import com.biblioteca.model.Autor;
import com.biblioteca.model.Livro;
import com.biblioteca.repository.LivroRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LivroController.class)
class LivroControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LivroRepository livroRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deveCriarLivroComSucesso() throws Exception {
        Autor autor = new Autor();
        autor.setId(1L);
        autor.setNome("Machado de Assis");

        Livro entrada = new Livro(null, "Dom Casmurro", "978-8535910667", 1899, "Romance", autor, null);
        Livro salvo = new Livro(1L, "Dom Casmurro", "978-8535910667", 1899, "Romance", autor, null);

        when(livroRepository.save(any(Livro.class))).thenReturn(salvo);

        mockMvc.perform(post("/api/livros")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(entrada)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.titulo").value("Dom Casmurro"))
                .andExpect(jsonPath("$.autor.id").value(1L));
    }

    @Test
    void deveRetornar404QuandoLivroNaoExistir() throws Exception {
        when(livroRepository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/livros/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deveListarLivrosOrdenados() throws Exception {
        Autor autor = new Autor(1L, "Machado de Assis", "Brasileira", null, null);
        Livro l1 = new Livro(1L, "Dom Casmurro", "978-8535910667", 1899, "Romance", autor, null);
        Livro l2 = new Livro(2L, "Memórias Póstumas de Brás Cubas", "978-8535911121", 1881, "Romance", autor, null);

        when(livroRepository.findAllByOrderByTituloAsc()).thenReturn(List.of(l1, l2));

        mockMvc.perform(get("/api/livros"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titulo").value("Dom Casmurro"))
                .andExpect(jsonPath("$[1].titulo").value("Memórias Póstumas de Brás Cubas"));
    }
}