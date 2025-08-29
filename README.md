# Birthday People

Uma aplicação para gerenciar uma lista de aniversariantes, permitindo operações de **CRUD** (Criar, Ler, Atualizar e Deletar).

## Tecnologias Utilizadas

- **HTML, CSS, JavaScript** puros
- **SASS** para pré-processamento do CSS (instalação global necessária)
- **SwiperJS** via CDN para navegação entre telas (estilo mobile, com controles de navegação inferior e swipe lateral)
- **SMACSS** e **BEM** para organização e padronização do CSS
- **json-server@0.17.4** para simular um backend e permitir persistência em `db.json`

## Scripts

- `live-server`: Roda o servidor frontend na porta **5500**
- `json-server`: Roda o backend com suporte a CRUD em `http://localhost:3000`
- `sass`: Compila os arquivos SASS para CSS com **watch**
- `sass:mini`: Compila e minifica os arquivos SASS

## Estrutura do Projeto

- Organização dos estilos seguindo o padrão **SMACSS** (base, layout, module, state, theme)
- Nomeação de classes seguindo o padrão **BEM** para facilitar manutenção e escalabilidade

## Funcionalidades

- Cadastro de aniversariantes
- Edição de informações
- Remoção de aniversariantes
- Visualização em diferentes telas com navegação fluida via **SwiperJS** e controles de navegação inferior
- Backend mockado com suporte a **CRUD**, paginação e filtros básicos

## Como rodar

1. Instale o **SASS** globalmente em sua máquina:

   ```bash
   npm install -g sass
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Rode os scripts para iniciar:

   - Backend (json-server):
     ```bash
     npm run json-server
     ```
   - Frontend (live-server):
     ```bash
     npm run live-server
     ```
   - SASS (watch):
     ```bash
     npm run sass
     ```

4. Abra o arquivo `index.html` em seu navegador (SwiperJS já está incluído via CDN).

O servidor estará disponível em:

```text
http://localhost:3000
```

com os endpoints do `json-server` expostos em `/`.

## Endpoints principais

- CRUD automático:

  - `GET /birthdays`
  - `GET /birthdays/:id`
  - `POST /birthdays`
  - `PUT /birthdays/:id`
  - `PATCH /birthdays/:id`
  - `DELETE /birthdays/:id`

- Paginação (json-server estável):

  - `GET /birthdays?_page=1&_limit=10`

- Busca e filtros:
  - `GET /birthdays?name_like=joabson`
  - `GET /birthdays?group=family`
