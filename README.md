# GitHub Explorer

## Descrição

Este projeto é uma aplicação React/Next.js para explorar repositórios do GitHub. Ele permite que os usuários pesquisem repositórios, visualizem seus próprios repositórios e repositórios estrelados, e filtrem os resultados com base em diferentes critérios.

## Tecnologias Utilizadas

- React
- Next.js
- TypeScript
- Zustand para gerenciamento de estado global
- SWR para cache e gerenciamento de dados
- TailwindCSS para estilização

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Amad3eu/magazord-frontend-react-test-github-explorer
   ```
2. Instale as dependências:
   ```bash
   cd magazord-frontend-react-test-github-explorer
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:3000` no seu navegador para ver a aplicação em execução.

## Funcionalidades

- Carregar os repositórios do usuário inicialmente
- Carregar os favoritos do usuário ao acessar a aba "Starred"
- Fazer uma busca ao digitar e fazer o submit com "Enter"
- Ao clicar em um repositório, trazer as informações dele

## Desafios enfrentados

- **Implementação do Zustand**: Utilizar Zustand para gerenciamento de estado global foi um requisito do projeto. A integração com SWR para cache de dados foi um desafio inicial.
- **Utilização do SWR**: SWR foi utilizado para chamadas à API com caching e revalidação, o que melhorou a performance e a experiência do usuário.
- **Estrutura do código**: Melhorar a estrutura do código separando em componentes menores e mais reutilizáveis foi essencial para a manutenção e escalabilidade do projeto.

## Possíveis melhorias

- **Testes**: Adicionar testes unitários e de integração para garantir a robustez da aplicação.
- **Responsividade**: Melhorar a responsividade do layout para diferentes tamanhos de tela.
- **Paginação**: Implementar paginação na lista de repositórios e favoritos para melhorar a navegação.
- **Filtros de busca**: Adicionar mais filtros para busca de repositórios, como por linguagem e tipo.
- **Detalhes do repositório**: Melhorar a exibição dos detalhes do repositório em um modal para uma melhor experiência do usuário.

## Estrutura do Projeto

```
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
├── components
│   ├── Header.tsx
│   ├── Loading.tsx
│   ├── RepoList.tsx
│   ├── SearchBar.tsx
├── context
│   ├── ThemeContext.tsx
├── store
│   ├── repoStore.ts
├── hooks
│   ├── useGithubData.ts
├── lib
│   ├── api.ts
├── public
│   ├── favicon.ico
├── README.md
├── package.json
├── tsconfig.json
└── next.config.js
```