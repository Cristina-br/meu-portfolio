# Cristina Elena Campos — Portfólio Profissional

🔗 **[Acessar o site](https://cristinaecampos.com.br)**

Portfólio profissional com minha trajetória, experiência em segurança SSL/TLS, formação em tecnologia e foco em Infraestrutura de TI e Cloud Computing.

## Sobre o projeto

Site estático desenvolvido com HTML, CSS e JavaScript puro, hospedado em arquitetura *cloud-native* na **AWS** com entrega global via CDN, HTTPS gerenciado e deploy contínuo automatizado. Os dados de certificações e laboratórios são estruturados em arquivos JSON para facilitar atualizações sem alterar o layout.

## Arquitetura e Tecnologias

### Front-end
- HTML5 semântico
- CSS3
- JavaScript puro (renderização dinâmica via JSON)

### Cloud, Rede e CI/CD
- **Amazon S3:** Armazenamento privado dos arquivos estáticos da aplicação.
- **Amazon CloudFront:** Distribuição de conteúdo (CDN) com HTTPS forçado e cache na borda.
- **AWS Certificate Manager (ACM):** Emissão e renovação automática de certificado SSL/TLS via validação DNS.
- **Cloudflare DNS:** Gerenciamento de zona DNS com *CNAME Flattening* no domínio raiz e regra de redirecionamento `301` (`www` para domínio raiz).
- **GitHub Actions (OIDC):** Pipeline de CI/CD para sincronização automática com o bucket S3 a cada *push* na branch `main`, sem uso de chaves estáticas de acesso.

## Estrutura do projeto

    ├── .github/workflows/   # Pipeline de deploy contínuo (CI/CD) para AWS S3
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
