# Biblioteca Web

Sistema web full-stack para cadastro e gerenciamento de **Autores** e **Livros** (relacionamento 1:N), desenvolvido individualmente para a disciplina de Engenharia de Software.

## Tecnologias

| Camada | Tecnologia / Versão |
| :--- | :--- |
| Backend | Java 17, Spring Boot 3.2 (Web, Data JPA, Validation, Lombok), Maven |
| Frontend | React 18, React Router 6, Axios, Node.js 20 |
| Banco de Dados | PostgreSQL 15 (desenvolvimento/produção) e H2 em memória (testes) |
| Testes | JUnit 5, Mockito, MockMvc (`@WebMvcTest` e `@SpringBootTest`) |
| DevOps / CI | Docker, Docker Compose, GitHub Actions |

## Estrutura de Pastas

```text
biblioteca-web/
├── .github/workflows/ci-cd.yml
├── backend/
│   ├── src/main/java/com/biblioteca/{model,repository,controller}
│   ├── src/test/java/com/biblioteca/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/{components,services}
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Como Executar com Docker

```bash
docker compose up -d --build
```

* Frontend React: `http://localhost:3000`
* Backend API / Swagger: `http://localhost:8080/swagger-ui.html`

## Como Rodar os Testes

```bash
cd backend
mvn test
```

## Desenvolvimento

* **Desenvolvimento Individual - Alex Marques**: Implementação completa do Backend (entidades `Autor` e `Livro`, repositórios, controllers REST e testes automatizados) e do Frontend (serviço de API, componentes de listagem/formulário e rotas).