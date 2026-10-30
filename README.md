
# Cristina Elena Campos — Portfólio Profissional

🔗 **[Acessar o site](https://cristina-br.github.io/meu-portfolio/)**

Portfólio profissional com minha trajetória, experiência em segurança SSL, formação em tecnologia e foco em Infraestrutura de TI e Cloud Computing.

## Sobre o projeto

Site estático desenvolvido com HTML, CSS e JavaScript puro, hospedado no GitHub Pages. Os dados de certificações e laboratórios são gerenciados via arquivos JSON, facilitando atualizações sem alterações no layout.

## Tecnologias

- HTML5 semântico
- CSS3
- JavaScript puro
- GitHub Pages

## Estrutura do projeto

    ├── assets/images/       # Imagens e favicon
    ├── data/                # Dados em JSON (certificações, laboratórios)
    ├── index.html           # Página principal
    ├── styles.css           # Estilos
    ├── script.js            # Lógica de renderização
    └── README.md

## Como atualizar

<details>
<summary>Adicionar currículo em PDF</summary>

1. Adicione o PDF ao repositório (ex: `assets/docs/curriculo-cristina.pdf`).
2. No `script.js`, altere `profileLinks.curriculoPdf` para o caminho do PDF.
3. O botão aparece automaticamente no site.

</details>

<details>
<summary>Adicionar certificado</summary>

1. Edite `data/certificacoes.json`.
2. Adicione um item em `destaques` com: `nome`, `instituicao`, `tipo`, `emissao` e `link`.

</details>

<details>
<summary>Adicionar laboratório</summary>

1. Crie a documentação em Markdown (ex: pasta `/labs`).
2. Edite `data/laboratorios.json` e adicione um item em `itens` com: `titulo`, `plataforma`, `objetivo` e `linkDocumentacao`.

</details>

---

Feito com ☁️ e ☕ por Cristina Elena Campos — 2026
