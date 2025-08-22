# Birthday People

Uma aplicação para gerenciar uma lista de aniversariantes, permitindo operações de **CRUD** (Criar, Ler, Atualizar e Deletar).

## Tecnologias Utilizadas

- **HTML, CSS, JavaScript** puros
- **SASS** para pré-processamento do CSS (instalação global necessária)
- **SwiperJS** via CDN para navegação entre telas (estilo mobile, com controles de navegação inferior e swipe lateral)
- **SMACSS** e **BEM** para organização e padronização do CSS

## Scripts

- `sass`: Compila os arquivos SASS para CSS
- `sass:mini`: Compila e minifica os arquivos SASS

## Estrutura do Projeto

- Organização dos estilos seguindo o padrão **SMACSS** (base, layout, module, state, theme)
- Nomeação de classes seguindo o padrão **BEM** para facilitar manutenção e escalabilidade

## Funcionalidades

- Cadastro de aniversariantes
- Edição de informações
- Remoção de aniversariantes
- Visualização em diferentes telas com navegação fluida via **SwiperJS** e controles de navegação inferior

## Como rodar

1. Instale o **SASS** globalmente em sua máquina (`npm install -g sass`)
2. Execute os scripts para compilar o CSS
3. Abra o arquivo `index.html` em seu navegador (SwiperJS já está incluído via CDN)
