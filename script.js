const portfolioDataUrls = {
  certificacoes: "data/certificacoes.json",
  laboratorios: "data/laboratorios.json"
};

const profileLinks = {
  curriculoPdf: null
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const renderCurriculoButton = () => {
  if (!profileLinks.curriculoPdf) return;

  const heroActions = document.getElementById("hero-actions");
  const link = createElement("a", "button button-secondary", "Currículo (PDF)");
  link.href = profileLinks.curriculoPdf;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  heroActions?.appendChild(link);
};

const renderCertificacoes = (certificacoes) => {
  const container = document.getElementById("certificacoes-destaque");
  if (!container) return;

  container.innerHTML = "";

  certificacoes.forEach((item) => {
    const card = createElement("article", "credential-card");

    card.appendChild(createElement("span", "credential-type", item.tipo));
    card.appendChild(createElement("h3", "", item.nome));
    card.appendChild(createElement("p", "credential-meta", `Instituição: ${item.instituicao}`));

    if (item.emissao) {
      card.appendChild(createElement("p", "credential-meta", `Emissão: ${item.emissao}`));
    }

    if (item.link) {
      const link = createElement("a", "", "Ver credencial");
      link.href = item.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.appendChild(link);
    }

    container.appendChild(card);
  });
};

const renderLaboratorios = (laboratorios) => {
  const container = document.getElementById("laboratorios-lista");
  if (!container) return;

  container.innerHTML = "";

  if (laboratorios.length === 0) {
    const callout = createElement("article", "labs-callout");
    callout.appendChild(
      createElement(
        "p",
        "",
        "Documentações em organização: em breve, esta seção trará resumos de laboratórios com links para os registros completos no GitHub."
      )
    );
    container.appendChild(callout);
    return;
  }

  laboratorios.forEach((lab) => {
    const card = createElement("article", "labs-callout");
    card.appendChild(createElement("h3", "", lab.titulo));
    card.appendChild(createElement("p", "", `${lab.plataforma} · ${lab.objetivo}`));

    if (lab.linkDocumentacao) {
      const link = createElement("a", "", "Acessar documentação");
      link.href = lab.linkDocumentacao;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.appendChild(link);
    }

    container.appendChild(card);
  });
};

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao carregar ${url}`);
  }
  return response.json();
};

const init = async () => {
  renderCurriculoButton();

  document.getElementById("current-year").textContent = String(new Date().getFullYear());

  try {
    const [certificacoes, laboratorios] = await Promise.all([
      fetchJson(portfolioDataUrls.certificacoes),
      fetchJson(portfolioDataUrls.laboratorios)
    ]);

    renderCertificacoes(certificacoes.destaques || []);
    renderLaboratorios(laboratorios.itens || []);
  } catch (error) {
    console.error(error);
  }
};

init();
