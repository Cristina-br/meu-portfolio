# Lab 01 — Hospedagem Cloud-Native com AWS (S3, CloudFront, ACM), Cloudflare e CI/CD

**Domínio em produção:** [https://cristinaecampos.com.br](https://cristinaecampos.com.br)  
**Repositório:** [Cristina-br/meu-portfolio](https://github.com/Cristina-br/meu-portfolio)  
**Stack:** AWS S3 • Amazon CloudFront • AWS Certificate Manager (ACM) • IAM (OIDC) • Cloudflare DNS • GitHub Actions

---

## 1. Objetivo

Migrar a hospedagem de um portfólio estático (HTML, CSS e JavaScript puro) do GitHub Pages para uma arquitetura **cloud-native na AWS**, aplicando boas práticas de segurança (princípio do menor privilégio, storage privado e autenticação sem credenciais estáticas), entrega global de conteúdo via CDN, gerenciamento de DNS e automação de deploy contínuo (CI/CD).

---

## 2. Arquitetura da Solução

```text
                       [ Usuário / Navegador ]
                                  │
                 ┌────────────────┴────────────────┐
                 ▼                                 ▼
     (cristinaecampos.com.br)           (www.cristinaecampos.com.br)
        Cloudflare DNS                     Cloudflare Proxy (Laranja)
      CNAME Flattening (Cinza)           Redirect Rule 301 ──► Raiz HTTPS
                 │
                 ▼
      [ Amazon CloudFront (CDN) ] ◄── Certificado SSL/TLS (AWS ACM)
                 │
         Origin Access Control (OAC)
                 │
                 ▼
       [ Amazon S3 Bucket ] (Acesso Público Bloqueado)
                 ▲
                 │  aws s3 sync + Invalidação de Cache
      [ GitHub Actions (CI/CD) ] ◄── Autenticação Federada (IAM OIDC)
```

---

## 3. Decisões Técnicas e Implementação

### 3.1. Armazenamento Privado com Amazon S3 + CloudFront (OAC)
* **Decisão:** O bucket S3 foi configurado com **Block All Public Access** ativado (sem *Static Website Hosting* público).
* **Por quê:** Evita a exposição direta do bucket na internet e impede que usuários contornem as políticas de cache e segurança da CDN. O acesso aos objetos é restrito exclusivamente à distribuição do CloudFront por meio de **Origin Access Control (OAC)** e uma *Bucket Policy* específica.

> *[Espaço para print: Configuração do Origin Access Control no CloudFront ou Bucket Policy no S3]*

---

### 3.2. Certificado SSL/TLS Gerenciado com AWS Certificate Manager (ACM)
* **Decisão:** Emissão de certificado SSL/TLS público na região **`us-east-1` (N. Virginia)** cobrindo tanto o domínio raiz (`cristinaecampos.com.br`) quanto o subdomínio (`www.cristinaecampos.com.br`), utilizando validação via DNS.
* **Por quê:** O Amazon CloudFront exige que certificados ACM associados a distribuições globais estejam provisionados na região `us-east-1`. A validação via registros `CNAME` na zona DNS permite que a AWS renove o certificado automaticamente antes do vencimento, sem intervenção manual.

---

### 3.3. Gerenciamento de DNS e Roteamento com Cloudflare
Como o protocolo DNS tradicional não permite registros `CNAME` na raiz de um domínio (zone apex), os *nameservers* do domínio no Registro.br foram delegados para a **Cloudflare**:

* **Domínio raiz (`cristinaecampos.com.br`):** Configurado via **CNAME Flattening** apontando para o endpoint do CloudFront com o proxy desativado (**DNS Only / nuvem cinza**). Isso evita conflitos de duplo proxy e garante que a negociação TLS ocorra diretamente com o certificado do AWS ACM.
* **Subdomínio `www` (`www.cristinaecampos.com.br`):** Configurado com proxy ativado (**Proxied / nuvem laranja**) e uma **Redirect Rule (HTTP 301)** que redireciona permanentemente qualquer requisição para `https://cristinaecampos.com.br`, preservando o caminho (`URI Path`) e os parâmetros (`Query String`).
* **HTTPS Forçado:** Ativado nativamente no *Behavior* do CloudFront (`Redirect HTTP to HTTPS`).

> *[Espaço para print: Tabela DNS e Redirect Rule configuradas na Cloudflare]*

---

### 3.4. Pipeline de CI/CD Sem Chaves Estáticas (GitHub Actions + OIDC)
* **Decisão:** Em vez de gerar um usuário IAM com `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` fixas, foi configurado um **Identity Provider (OIDC)** no AWS IAM vinculado exclusivamente ao repositório `Cristina-br/meu-portfolio` (branch `main`).
* **Fluxo do Pipeline (`.github/workflows/deploy.yml`):**
  1. Autenticação temporária na AWS via `aws-actions/configure-aws-credentials` assumindo uma *IAM Role* com permissões restritas ao bucket S3 e à distribuição do CloudFront.
  2. Sincronização dos arquivos estáticos com `aws s3 sync . s3://$S3_BUCKET_NAME --delete`, excluindo arquivos internos do repositório (`.git/*`, `.github/*`, `README.md`, `labs/*`).
  3. Criação de invalidação no CloudFront (`/*`) para garantir que alterações no site reflitam imediatamente na borda.

> *[Espaço para print: Execução com sucesso do workflow no GitHub Actions]*

---

## 4. Troubleshooting e Lições Aprendidas

* **Sintaxe de continuação de linha no Shell (Exit Code 127):** Ao adicionar novas exclusões (`--exclude "labs/*"`) no comando `aws s3 sync` dentro do YAML do GitHub Actions, a ausência da barra invertida (`\`) na linha anterior fez o runner interpretar `--exclude` como um comando independente. O ajuste da quebra de linha resolveu a execução do pipeline.
* **Desativação definitiva do GitHub Pages:** Após a migração, apenas clicar em *Unpublish site* não impedia novas publicações automáticas a cada *commit* na `main`. A solução foi alterar a fonte (*Source*) de *Deploy from a branch* para *GitHub Actions* sem workflow de Pages associado e despublicar o ambiente.
* **Interação entre Proxy Cloudflare e CloudFront:** Manter o registro raiz em modo *DNS Only* simplifica a cadeia de certificados SSL e garante que os cabeçalhos e métricas de cache sejam controlados diretamente pela AWS.

---

## 5. Próximos Passos

* [ ] Adicionar evidências visuais (prints das configurações AWS, Cloudflare e Actions) na pasta `labs/assets/`.
* [ ] Implementar monitoramento básico de custos (AWS Budgets) e métricas de requisições no CloudFront.
* [ ] Evoluir a arquitetura para suportar uma seção de blog técnico.
