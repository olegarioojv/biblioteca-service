# 📚 Biblioteca Service & 📩 Mail Service

Projeto final – Arquitetura Limpa & Microsserviços (NestJS + RabbitMQ + Nodemailer)

---

## 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js para construção de aplicações escaláveis
- **TypeORM** + **MySQL** - ORM e banco de dados relacional
- **RabbitMQ** - Sistema de mensageria para comunicação entre microsserviços
- **Nodemailer** + **Pug** - Envio de emails com templates HTML
- **Brevo (Sendinblue)** - Serviço SMTP gratuito para envio de emails

---

## 📂 Estrutura do Projeto

### 🔹 Biblioteca Service

Serviço principal responsável pela gestão da biblioteca:

#### **Módulo Users**
- Cadastro de usuários
- Listagem e consulta
- Atualização e remoção
- Atribuição de departamento
- Emissão de evento `user.created` no RabbitMQ

#### **Módulo Books**
- Cadastro de livros
- Listagem e consulta
- Atualização e remoção

#### **Módulo Loans**
- Criação de empréstimos (evento `loan.created`)
- Devolução de livros
- Controle de disponibilidade dos livros

#### **Mensageria**
- Integração via `RmqModule`
- Emissão de eventos para o **Mail Service**

---

### 🔹 Mail Service

Serviço de mensageria responsável pelo envio de emails:

#### **Eventos Suportados**
- `user.created` → Email de boas-vindas
- `loan.created` → Email de confirmação de empréstimo

#### **Configurações**
- SMTP Brevo via `nodemailer`
- Templates em **Pug**
- Logs detalhados de envio

---

## ⚙️ Configuração

### 📌 Pré-requisitos

- **Docker** (para RabbitMQ e MySQL)
- **Node.js** (versão LTS recomendada)
- **NPM** ou **Yarn**

---

### 📌 1. Subir RabbitMQ e MySQL com Docker

Crie um arquivo `docker-compose.yml`:

```yaml
version: "3.9"
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest

  mysql:
    image: mysql:8.1
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: biblioteca
```

Execute o comando para subir os containers:

```bash
docker-compose up -d
```

---

### 📌 2. Configurar MySQL

Crie o banco de dados (caso não seja criado automaticamente):

```sql
CREATE DATABASE biblioteca;
```

---

### 📌 3. Importar Postman Collection

- Importe o arquivo `biblioteca Service.postman_collection.json` disponível no repositório `biblioteca-service`
- Todas as rotas já estão pré-configuradas com exemplos prontos para uso

---

### 📌 4. Instalar Dependências

Em cada microsserviço (`biblioteca-service` e `mail-service`), execute:

```bash
npm install
```

---

### 📌 5. Configurar Variáveis de Ambiente

#### **Biblioteca Service (`.env`)**

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=biblioteca
```

#### **Mail Service (`.env`)**

```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=SEU_USER_BREVO
SMTP_PASS=SUA_SENHA_BREVO
MAIL_FROM=seuemail@gmail.com
```

> ⚠️ **Importante**: Substitua `SEU_USER_BREVO`, `SUA_SENHA_BREVO` e `seuemail@gmail.com` pelas suas credenciais do Brevo.

---

## 🗃️ TypeORM - Gerenciamento de Migrations

### 1️⃣ Criar Migration

Sempre que criar ou alterar uma entidade (`.entity.ts`), gere uma nova migration:

```bash
npx ts-node ./node_modules/typeorm/cli.js migration:generate ./src/migrations/NOME_DA_MIGRATION -d ./src/data-source.ts
```

### 2️⃣ Executar Migrations

Para aplicar todas as migrations no banco de dados:

```bash
npx ts-node ./node_modules/typeorm/cli.js migration:run -d ./src/data-source.ts
```

---

## 🚀 Executar o Projeto

Após concluir todos os passos de configuração, inicie os microsserviços:

```bash
npm run start:dev
```

Teste as rotas utilizando a collection do Postman importada anteriormente.

---

## 📋 Endpoints Principais

### **Biblioteca Service**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/users` | Criar novo usuário |
| GET | `/users` | Listar todos os usuários |
| GET | `/users/:id` | Buscar usuário por ID |
| PUT | `/users/:id` | Atualizar usuário |
| DELETE | `/users/:id` | Remover usuário |
| POST | `/books` | Cadastrar livro |
| GET | `/books` | Listar livros |
| POST | `/loans` | Criar empréstimo |
| PUT | `/loans/:id/return` | Devolver livro |

---

## 📧 Configuração do Brevo (SMTP)

1. Crie uma conta gratuita em [Brevo](https://www.brevo.com/)
2. Acesse **SMTP & API** nas configurações
3. Gere uma **chave SMTP**
4. Use as credenciais no arquivo `.env` do **Mail Service**

---

## 🐰 RabbitMQ Management

Acesse o painel de gerenciamento do RabbitMQ:

```
http://localhost:15672
```

**Credenciais padrão:**
- **Usuário:** guest
- **Senha:** guest

---

## 📝 Observações

- Certifique-se de que o RabbitMQ e MySQL estão rodando antes de iniciar os microsserviços
- Verifique os logs do console para acompanhar o envio de emails
- As migrations devem ser executadas antes da primeira execução do projeto

---
