# Cristina Elena Campos — Portfólio Profissional

🔗 **Acesse o site:** [cristinaecampos.com.br](https://cristinaecampos.com.br)

Portfólio profissional com minha trajetória, experiência em segurança SSL/TLS, formação em tecnologia e foco em Infraestrutura de TI e Cloud Computing.

## Sobre o projeto

Site estático desenvolvido com HTML, CSS e JavaScript puro, hospedado em arquitetura *cloud-native* na **AWS** com entrega global via CDN, HTTPS gerenciado e deploy contínuo automatizado. As certificações e laboratórios são carregados a partir de arquivos JSON, permitindo adicionar novos itens editando apenas os dados, sem precisar mexer no código HTML ou CSS.

## Arquitetura e Tecnologias

### Front-end
- HTML5 semântico
- CSS3
- JavaScript puro (renderização dinâmica via JSON)

### Cloud, Rede e CI/CD
- **Amazon S3:** Armazenamento privado dos arquivos estáticos da aplicação (via OAC).
- **Amazon CloudFront:** Distribuição de conteúdo (CDN) com HTTPS forçado, cache na borda e tratamento customizado de erros (`403`/`404` mapeados para `404.html`).
- **AWS Certificate Manager (ACM):** Emissão e renovação automática de certificado SSL/TLS via validação DNS.
- **Cloudflare DNS:** Gerenciamento de zona DNS com *CNAME Flattening* no domínio raiz e regra de redirecionamento `301` (`www` para domínio raiz).
- **GitHub Actions (OIDC):** Pipeline de CI/CD para sincronização automática com o bucket S3 e invalidação de cache no CloudFront a cada *push* na branch `main`, sem uso de chaves estáticas de acesso.

## Laboratórios Documentados

- **[Lab 01 — Hospedagem Cloud-Native com AWS (S3, CloudFront, ACM), Cloudflare e CI/CD](./labs/hospedagem-aws-cloudfront.md):** Documentação completa da arquitetura, decisões de segurança (OAC, menor privilégio no IAM), gerenciamento de DNS e *troubleshooting* de autenticação OIDC.

## Estrutura do projeto

```text
├── .github/workflows/   # Pipeline de deploy contínuo (CI/CD) para AWS S3 e CloudFront
├── assets/images/       # Imagens e favicon do site
├── data/                # Dados em JSON (certificações, laboratórios)
├── labs/                # Documentação técnica dos laboratórios práticos
│   └── assets/          # Evidências visuais e diagramas dos labs
├── 404.html             # Página customizada de erro 404 (servida pelo CloudFront)
├── index.html           # Página principal
├── styles.css           # Estilos
├── script.js            # Lógica de renderização
└── README.md
```

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

1. Crie a documentação em Markdown na pasta `labs/` (e salve eventuais prints em `labs/assets/`).
2. Edite `data/laboratorios.json` e adicione um item em `itens` com: `titulo`, `plataforma`, `objetivo` e `linkDocumentacao`.
3. Adicione o link correspondente na seção **Laboratórios Documentados** deste `README.md`.

</details>

---

Feito com ☁️ e 🤖 por Cristina Elena Campos — 2026
