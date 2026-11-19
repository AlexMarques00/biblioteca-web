package com.biblioteca;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class IntegracaoTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deveVincularLivroAAutor() throws Exception {
        String autorJson = """
                {
                  "nome": "Graciliano Ramos",
                  "nacionalidade": "Brasileira",
                  "dataNascimento": "1892-10-27"
                }
                """;

        MvcResult autorResult = mockMvc.perform(post("/api/autores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(autorJson))
                .andExpect(status().isCreated())
                .andReturn();

        JsonNode autorCriado = objectMapper.readTree(autorResult.getResponse().getContentAsString());
        long autorId = autorCriado.get("id").asLong();

        String livroJson = """
                {
                  "titulo": "Vidas Secas",
                  "isbn": "978-8501012074",
                  "anoPublicacao": 1938,
                  "genero": "Romance",
                  "autor": { "id": %d }
                }
                """.formatted(autorId);

        mockMvc.perform(post("/api/livros")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(livroJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("Vidas Secas"))
                .andExpect(jsonPath("$.autor.id").value(autorId));
    }

    @Test
    void deveExecutarFluxoCompletoAutor() throws Exception {
        String novoAutor = """
                {
                  "nome": "Jorge Amado",
                  "nacionalidade": "Brasileira",
                  "dataNascimento": "1912-08-10"
                }
                """;

        MvcResult criado = mockMvc.perform(post("/api/autores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(novoAutor))
                .andExpect(status().isCreated())
                .andReturn();

        long id = objectMapper.readTree(criado.getResponse().getContentAsString()).get("id").asLong();

        mockMvc.perform(get("/api/autores/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Jorge Amado"));

        String atualizado = """
                {
                  "nome": "Jorge Leal Amado de Faria",
                  "nacionalidade": "Brasileira",
                  "dataNascimento": "1912-08-10"
                }
                """;

        mockMvc.perform(put("/api/autores/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(atualizado))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Jorge Leal Amado de Faria"));

        mockMvc.perform(delete("/api/autores/" + id))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/autores/" + id))
                .andExpect(status().isNotFound());
    }
}