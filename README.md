# Biblioteca Web

Sistema web full-stack para cadastro e gerenciamento de **Autores** e **Livros** (relacionamento 1:N), desenvolvido individualmente para a disciplina de Engenharia de Software.

## Tecnologias

| Camada | Tecnologia / Versão |
| :--- | :--- |
| Backend | Java 17, Spring Boot 3.2 (Web, Data JPA, Validation, Lombok), Maven |
| Frontend | React 18, React Router 6, Axios, Node.js 20+ |
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

## Como Executar com Docker (Recomendado)

Com o Docker Desktop em execução, suba todos os serviços (PostgreSQL, Backend e Frontend) na raiz do projeto:

```bash
docker compose up -d --build
```

* **Frontend React:** `http://localhost:3000`
* **Backend API / Swagger UI:** `http://localhost:8080/swagger-ui.html`

## Como Instalar Dependências e Rodar Localmente

### 1. Banco de Dados (PostgreSQL 15)
Suba apenas o contêiner do banco de dados (ou utilize um PostgreSQL local com o banco `biblioteca_db` e usuário/senha `postgres`):

```bash
docker compose up -d postgres
```

### 2. Backend (Spring Boot)
Entre na pasta `backend`, baixe as dependências Maven e inicie a API na porta `8080`:

```bash
cd backend
mvn dependency:resolve
mvn spring-boot:run
```

### 3. Frontend (React)
Em outro terminal, entre na pasta `frontend`, instale os pacotes Node e inicie a aplicação na porta `3000`:

```bash
cd frontend
npm install
npm start
```

## Como Rodar os Testes

### Testes do Backend (JUnit 5 + Mockito + Integração H2)
```bash
cd backend
mvn test
```

### Testes e Build do Frontend
```bash
cd frontend
npm test -- --watchAll=false --passWithNoTests
npm run build
```

## Desenvolvimento

* **Desenvolvimento Individual - Alex Marques:** Implementação completa do Backend (entidades `Autor` e `Livro`, repositórios, controllers REST e testes automatizados), do Frontend (serviço de API, componentes de listagem/formulário e rotas), além da configuração de Docker e CI/CD no GitHub Actions.