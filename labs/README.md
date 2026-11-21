# Laboratórios Práticos — Cloud & Infraestrutura

Índice dos estudos de caso e implementações práticas documentadas neste repositório, com foco em arquitetura cloud-native, segurança, redes e automação.

## Índice de Laboratórios

- **[Lab 01 — Hospedagem Cloud-Native com AWS (S3, CloudFront, ACM), Cloudflare e CI/CD](./hospedagem-aws-cloudfront.md)**
  - **Tecnologias:** Amazon S3 (OAC), Amazon CloudFront, AWS Certificate Manager (ACM), IAM (OIDC), Cloudflare DNS, GitHub Actions.
  - **Destaques:** Armazenamento privado sem exposição pública, roteamento customizado (`403`/`404` mapeados para `404.html`), *CNAME Flattening* no domínio raiz e deploy automatizado sem chaves estáticas.
