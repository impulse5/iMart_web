<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="src/assets/imart_logo_white.svg" alt="Logo" width="155" height="55">
  </a>

<h3 align="center">iMart - Web</h3>

  <p align="center">
    Gerencie de forma inteligente o seu mercado com a gente! 🥳
    <br />
    <a href="https://github.com/orgs/impulse5/discussions"><strong>Explore nossas discussions »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">Experimente nosso site!</a>
    ·
    <a href="https://github.com/impulse5/iMart_web/issues/new?assignees=&labels=&projects=&template=new-bug.md&title=%F0%9F%90%9E+Bug+%7C+">Reportar um bug</a>
    ·
    <a href="https://github.com/impulse5/iMart_web/issues/new?assignees=&labels=&projects=&template=new-feature.md&title=%F0%9F%9A%80+Feature+%7C+">Pedir uma feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tópicos</summary>
  <ol>
    <li>
      <a href="#Sobre-o-projeto-ℹ️">Sobre o projeto</a>
      <ul>
        <li><a href="#Tecnologias-💻">Tecnologias</a></li>
      </ul>
    </li>
    <li>
      <a href="#Rodando-o-projeto-🚀">Rodando o Projeto</a>
      <ul>
        <li><a href="#Pre-requisitos-📦">Pre-requisitos</a></li>
        <li><a href="#Instalação-🗂️">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#Conhecimentos-Gerais-🧠">Conhecimentos gerais</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre o projeto ℹ️

- A ideia do iMart é construir uma solução atualizada e que auxilie na visualização de dados para os mercados em geral, atualmente tal demanda é vigente no mercado, visando isso, construimos este projeto.

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

### Tecnologias 💻

* [![Typescript][Typescript.label]][Typescript-url]
* [![Vite][Vite.label]][Vite-url]
* [![React][React.js]][React-url]
* [![Tailwind][Tailwind.label]][Tailwind-url]
* [![Shadcn-UI][Shadcn.label]][Shadcn-url]
* [![Axios][Axios.label]][Axios-url]
* [![ReactRouter][ReactRouter.label]][ReactRouter-url]
* [![Zod][Zod.label]][Zod-url]
* [![Jest][Jest.label]][Jest-url]
* [![TestingLibrary][TestingLibrary.label]][TestingLibrary-url]

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

<!-- GETTING STARTED -->
## Rodando o projeto 🚀

* Para executar o projeto siga as orientações descritas abaixo:
  - Ou simplesmente acesse nosso [deploy](https://imart-web.onrender.com/cadastre-se/dados-empresariais)!

### Pre-requisitos 📦

- Para rodar o projeto tenha em mente que você precisará dos seguintes pre-requisitos:
  - Ter o node-js instalado na versão 20.11.0
  - Ter o node package manager instalado.

### Instalação 🗂️

1. Primeiramente você precisará clonar o projeto:
```bash
# você não precisa clonar necessariamente a develop.

git clone -b develop https://github.com/impulse5/iMart_web
```

2. Agora entre na pasta do projeto e baixe as dependências:
```bash
cd iMart_web
npm i
```

3. Agora para rodar o projeto, basta rodar o seguinte comando:
```bash
npm run dev
```


**Opcionais: ❗️**
* Caso queira rodar os testes do Jest, simplesmente rode:
```bash
npm run test
```

* Caso você for contribuir para o projeto, uma recomendação é utilizar nosso linter, para usar você precisará da extensão [ESLINT](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) e adicionar os seguintes comandos no seu `settings.json` da sua IDE:

  - VSCode:
  ```json
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.addMissingImports": "explicit"
  },
    "editor.formatOnSave": false
  }
  ```

### Conhecimentos Gerais 🧠

- Caso você esteja tendo problemas ao rodar o projeto no linux, instale essa biblioteca:
```bash 
npm i @rollup/rollup-linux-x64-gnu
```

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[issues-shield]: https://img.shields.io/github/issues/impulse5/iMart_web.svg?style=for-the-badge
[issues-url]: https://github.com/impulse5/iMart_web/issues
[license-shield]: https://img.shields.io/github/license/impulse5/iMart_web.svg?style=for-the-badge
[license-url]: https://github.com/impulse5/iMart_web/blob/main/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Axios.label]: https://img.shields.io/badge/Axios-%23FFFFFF.svg?style=for-the-badge&logo=axios&logoColor=purple
[Axios-url]: https://axios-http.com/ptbr/docs/intro
[ReactRouter.label]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[ReactRouter-url]: https://reactrouter.com/en/main
[Typescript.label]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Zod.label]: https://img.shields.io/badge/Zod-%23003366.svg?style=for-the-badge&logo=zod&logoColor=white
[Zod-url]: https://zod.dev/
[Jest.label]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/pt-BR/
[TestingLibrary.label]: https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white
[TestingLibrary-url]: https://testing-library.com/
[Shadcn.label]: https://img.shields.io/badge/shadcn--ui-000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
[Vite.label]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Tailwind.label]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
