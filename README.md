# Portfólio profissional — Cristina Elena Campos

Site estático em HTML, CSS e JavaScript puro, preparado para publicação no GitHub Pages.

## Publicação no GitHub Pages

1. Acesse **Settings > Pages** no repositório.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Em **Branch**, escolha a branch principal e a pasta **/(root)**.
4. Salve e aguarde a publicação.

## Atualizações rápidas

### Adicionar foto profissional

- Substitua o arquivo:
  - `/assets/images/foto-profissional-placeholder.svg`
- Ou altere o caminho da imagem na seção Hero no arquivo `/index.html`.

### Adicionar currículo em PDF

1. Adicione o PDF ao repositório (exemplo: `/assets/docs/curriculo-cristina.pdf`).
2. No arquivo `/script.js`, altere `profileLinks.curriculoPdf` para o caminho do PDF.
3. O botão "Currículo (PDF)" aparecerá automaticamente no Hero.

### Adicionar certificado em destaque

1. Edite `/data/certificacoes.json`.
2. Adicione um novo item em `destaques` com os campos:
   - `nome`
   - `instituicao`
   - `tipo`
   - `emissao` (ou `null`)
   - `link` (ou `null`)

### Adicionar laboratório

1. Crie a documentação completa do laboratório em Markdown no GitHub (por exemplo em `/labs`).
2. Edite `/data/laboratorios.json` e adicione um item em `itens` com:
   - `titulo`
   - `plataforma`
   - `objetivo`
   - `linkDocumentacao` (quando disponível)
