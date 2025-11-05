// ===== Config =====
const WHATSAPP_NUMBER = '5521999743004'; // +55 21 99974-3004

// Monta mensagem padrão (sem formulário)
function defaultWhatsMessage() {
  return [
    '*Contato via site BitFellow*',
    '',
    'Olá! Quero falar sobre um projeto. Pode me ajudar?'
  ].join('\n');
}

// Gera URLs: app e web
function buildWhatsLinks(messageText) {
  const text = encodeURIComponent(messageText || defaultWhatsMessage());
  const phone = WHATSAPP_NUMBER;
  const appURL = `whatsapp://send?phone=${phone}&text=${text}`;
  const webURL = `https://wa.me/${phone}?text=${text}`;
  return { appURL, webURL };
}

// Tentar abrir App e cair pro Web se falhar
function openWhatsWithFallback(messageText) {
  const { appURL, webURL } = buildWhatsLinks(messageText);

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  // iOS: abrir app direto
  if (isIOS) {
    window.location.href = appURL;
    // fallback discreto
    setTimeout(() => { window.open(webURL, '_blank'); }, 1800);
    return;
  }

  // Android: tentar app, depois web
  if (isAndroid) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = appURL;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
      window.open(webURL, '_blank');
    }, 1300);
    return;
  }

  // Desktop: tentar protocolo e fallback
  const start = Date.now();
  const timeout = 1200;
  // tentativa
  window.location.href = appURL;

  setTimeout(() => {
    const elapsed = Date.now() - start;
    // se continuamos aqui ~sem foco (não abriu app), abre web
    if (elapsed < timeout + 200) {
      window.open(webURL, '_blank');
    }
  }, timeout);
}

// ===== Header: dark->light on scroll =====
(function () {
  const header = document.querySelector('.site-header');
  const sentinel = document.getElementById('headerSentinel');
  if (!header || !sentinel) return;

  header.classList.add('header--dark');
  header.classList.remove('header--light');

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          header.classList.add('header--dark');
          header.classList.remove('header--light');
        } else {
          header.classList.remove('header--dark');
          header.classList.add('header--light');
        }
      });
    },
    { root: null, threshold: 0, rootMargin: "-64px 0px 0px 0px" }
  );
  obs.observe(sentinel);
})();

// ===== Reveal on Scroll =====
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('reveal-show'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
})();

// ===== CTA WhatsApp (topo e hero) =====
document.getElementById('ctaTopWhats')?.addEventListener('click', (e) => {
  e.preventDefault();
  openWhatsWithFallback(defaultWhatsMessage());
});
document.getElementById('ctaHeroWhats')?.addEventListener('click', (e) => {
  e.preventDefault();
  openWhatsWithFallback(defaultWhatsMessage());
});

// ===== Formulário -> WhatsApp =====
(function () {
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = (document.getElementById('email')?.value || '').trim();
    const tech = document.getElementById('tech').value;
    const problem = document.getElementById('problem').value;
    const scope = document.getElementById('scope').value.trim();
    const deadline = (document.getElementById('deadline')?.value || '').trim();
    const budget = (document.getElementById('budget')?.value || '').trim();

    const lines = [
      `*Novo pedido via site*`,
      ``,
      `*Nome:* ${name}`,
      email ? `*E-mail:* ${email}` : null,
      `*Tecnologia:* ${tech}`,
      `*Problema/Objetivo:* ${problem}`,
      `*Descrição:* ${scope}`,
      deadline ? `*Prazo desejado:* ${deadline}` : null,
      budget ? `*Orçamento:* ${budget}` : null,
      ``,
      `Pode me chamar por aqui.`
    ].filter(Boolean);

    formMessage?.classList?.remove('hidden');
    openWhatsWithFallback(lines.join('\n'));
    contactForm.reset();
  });
})();

// ===== Projetos: conteúdo do modal (Desafio/Solução/Impacto) =====
const PROJECTS = {
  adocique: {
    title: 'E-commerce',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Melhorar a experiência de compra de doces produtos, centralizando o catálogo e simplificando o processo de pedido.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Site e-commerce estático com catálogo interativo e carrinho de compras integrado ao WhatsApp.</p>
      <p><b class="text-[#00c7e5]">Impacto:</b> Clientes montam pedidos de forma intuitiva e o vendedor recebe o resumo organizado, otimizando o tempo.</p>
    `,
    link: '#'
  },
  blogpessoal: {
    title: 'Gerenciador de Tarefas',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Desenvolver uma API web para simplificar o gerenciamento de tarefas.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Uma API RESTful construída com .NET 6 e Entity Framework, conectada a um banco de dados SQL Server, projetada para otimizar a organização de tarefas.</p>
      <p><b class="text-[#00c7e5]">Tecnologias:</b> .NET 6, Entity Framework, SQL Server, REST API</p>
    `,
    link: '#'
  },
  sistemagestao: {
    title: 'Gestão de Carteiras',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Construir uma plataforma web para gestão profissional de carteiras que permita acompanhar posições, alocação, performance e alertas em tempo real.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Aplicação que agrega dados de múltiplas fontes, calcula métricas de performance (retorno, volatilidade, drawdown), exibe gráficos interativos de alocação e histórico e permite importação de extratos/negociações para conciliação automática.</p>
      <p><b class="text-[#00c7e5]">Impacto:</b> Decisões mais rápidas, baseadas em dados, melhorando a gestão.</p>
      <p><b class="text-[#00c7e5]">Tecnologias:</b> React (Vite/Expo Web se preferir), Chart.js / Recharts, Node.js + Express, SQLite / PostgreSQL, TypeScript, autenticação JWT, deploy em Vercel / Heroku.</p>
    `,
    link: '#'
  },
  dashboardkpis: {
    title: 'Dashboard de KPIs',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Trazer visão executiva clara sobre metas e funil, reduzindo tempo de relatório.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Dashboard com KPIs, funil e metas vs. resultados.</p>
      <p><b class="text-[#00c7e5]">Impacto:</b> -35% no tempo de relatórios e +22% na taxa de conversão.</p>
    `,
    link: '#'
  },
  QuantoVouGastar: {
    title: 'Calculadora de Gastos',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Trazer quanto vai ser gasto de combustível entre rota de origem e destino.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Calcular de forma rapido e com dados reais o consumo de combustível</p>
      <p><b class="text-[#00c7e5]">Tecnologias:</b> JavaScript, Firebase, API do Google</p>
    `,
    link: '#'
  },
  CrudInteligente: {
    title: 'CRUD Inteligente',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Desenvolver um CRUD controlado por IA.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Calcular de forma rapido e com dados reais o consumo de combustível</p>
      <p><b class="text-[#00c7e5]">Impacto:</b> Decisões mais rápidas, baseadas em dados, melhorando a gestão.</p>
      <p><b class="text-[#00c7e5]">Tecnologias:</b> JavaScript, Firebase, API do Google</p>
    `,
    link: '#'
  }
};

// ===== Modal handlers =====
(function () {
  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modal-content-container');
  const modalLink = document.getElementById('modalLink');
  const modalWhats = document.getElementById('modalWhats');

  document.querySelectorAll('.project-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-open');
      const proj = PROJECTS[key];
      if (!proj) return;

      projectModal.setAttribute('aria-hidden', 'false');
      projectModal.style.display = 'flex';
      modalTitle.textContent = proj.title;
      modalContent.innerHTML = proj.html;
      modalLink.href = proj.link || '#';

      // botão Whats dentro do modal
      modalWhats.onclick = (e) => {
        e.preventDefault();
        const msg = `*Quero saber mais sobre:* ${proj.title}`;
        openWhatsWithFallback(msg);
      };
    });
  });

  modalClose.addEventListener('click', () => {
    projectModal.style.display = 'none';
    projectModal.setAttribute('aria-hidden', 'true');
  });
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.style.display = 'none';
      projectModal.setAttribute('aria-hidden', 'true');
    }
  });
})();

// ===== Carrossel dentro de cada CARD =====
(function () {
  document.querySelectorAll('.project-carousel').forEach((wrap) => {
    const slides = wrap.querySelector('.slides');
    const imgs = slides.querySelectorAll('img');
    const prev = wrap.querySelector('.prev');
    const next = wrap.querySelector('.next');
    let idx = 0;

    function go(i) {
      idx = (i + imgs.length) % imgs.length;
      slides.style.transform = `translateX(${-idx * 100}%)`;
    }

    prev.addEventListener('click', () => go(idx - 1));
    next.addEventListener('click', () => go(idx + 1));

    // auto-play leve
    setInterval(() => go(idx + 1), 5500);
  });
})();

// ===== Assistente Virtual: Bit =====
(function () {
  const bitToggle = document.getElementById('bit-toggle');
  const bitChat = document.getElementById('bit-chat');
  const bitClose = document.getElementById('bit-close');
  const bitMessages = document.getElementById('bit-messages');
  const bitForm = document.getElementById('bit-form');
  const bitInput = document.getElementById('bit-input');

  bitToggle.addEventListener('click', () => bitChat.style.display = 'flex');
  bitClose.addEventListener('click', () => bitChat.style.display = 'none');

  function push(type, html) {
    const div = document.createElement('div');
    div.className = 'msg ' + type;
    div.innerHTML = html;
    bitMessages.appendChild(div);
    bitMessages.scrollTop = bitMessages.scrollHeight;
  }
  function pushUser(text) { push('user', text); }
  function pushBot(text) { push('bot', text); }

  const state = {
    mode: 'idle', // idle | assist_name | assist_tech | assist_problem | assist_scope | assist_deadline | assist_budget
    brief: { name: '', tech: '', problem: '', scope: '', deadline: '', budget: '' }
  };

  function resetAssist() {
    state.mode = 'idle';
    state.brief = { name: '', tech: '', problem: '', scope: '', deadline: '', budget: '' };
  }
  function startAssist() {
    resetAssist();
    state.mode = 'assist_name';
    pushBot('Perfeito! Vamos montar seu briefing em 6 passos. <br/><b>1)</b> Qual seu <b>nome</b>?');
  }
  function handleAssist(input) {
    const t = input.trim();
    switch (state.mode) {
      case 'assist_name':
        state.brief.name = t; state.mode = 'assist_tech';
        pushBot('<b>2)</b> Qual <b>tecnologia</b> você quer? (Website, WordPress, Mobile, API Python, Dashboard, Banco de Dados, IA/Visão, E-commerce ou outra)');
        break;
      case 'assist_tech':
        state.brief.tech = t; state.mode = 'assist_problem';
        pushBot('<b>3)</b> Qual o <b>problema/objetivo</b>? (ex.: integração com API, checkout, dashboard de KPIs...)');
        break;
      case 'assist_problem':
        state.brief.problem = t; state.mode = 'assist_scope';
        pushBot('<b>4)</b> Descreva <b>rapidamente o escopo</b> (ex.: páginas, recursos, integrações).');
        break;
      case 'assist_scope':
        state.brief.scope = t; state.mode = 'assist_deadline';
        pushBot('<b>5)</b> Qual o <b>prazo desejado</b>? (ex.: 30 dias)');
        break;
      case 'assist_deadline':
        state.brief.deadline = t; state.mode = 'assist_budget';
        pushBot('<b>6)</b> Tem <b>orçamento</b> estimado? (opcional) Se não, pode dizer "sem".');
        break;
      case 'assist_budget':
        state.brief.budget = t.toLowerCase() === 'sem' ? '' : t;
        const msg = [
          `*Briefing via Assistente Bit*`,
          ``,
          `*Nome:* ${state.brief.name}`,
          `*Tecnologia:* ${state.brief.tech}`,
          `*Problema/Objetivo:* ${state.brief.problem}`,
          `*Descrição:* ${state.brief.scope}`,
          state.brief.deadline ? `*Prazo desejado:* ${state.brief.deadline}` : null,
          state.brief.budget ? `*Orçamento:* ${state.brief.budget}` : null
        ].filter(Boolean).join('\n');
        const { appURL, webURL } = buildWhatsLinks(msg);
        pushBot(`Fechou! Pode enviar seu briefing no WhatsApp:<br/>
          <a class="link" href="${appURL}">👉 Abrir no app</a> &nbsp;|&nbsp;
          <a class="link" href="${webURL}" target="_blank">Abrir no web</a>`);
        resetAssist();
        break;
    }
  }

  function intentReply(text) {
    const t = text.toLowerCase();
    if (t.includes('assistido') || t.includes('briefing') || t.includes('iniciar')) { startAssist(); return null; }
    if (t.includes('serviço') || t.includes('servicos') || t.includes('oferecem')) {
      return 'Oferecemos <b>Web & Apps</b>, <b>APIs & Integrações</b>, <b>Data & Analytics</b>, <b>E-commerce</b>, <b>IA & Visão</b> e <b>Infra & Segurança</b>. Quer detalhar algum?';
    }
    if (t.includes('prazo') || t.includes('tempo')) {
      return 'Prazo típico de <b>site institucional</b>: 2–4 semanas. Sistemas/integrações variam conforme escopo. Qual é seu prazo desejado?';
    }
    if (t.includes('preço') || t.includes('orc') || t.includes('orçamento') || t.includes('valor')) {
      return 'Podemos trabalhar com <b>escopo fechado</b> ou por <b>sprints</b>. Se quiser, digite <b>“Iniciar modo assistido”</b> que eu preparo um briefing e já te levo pro WhatsApp.';
    }
    if (t.includes('humano') || t.includes('vendedor') || t.includes('atendente') || t.includes('falar')) {
      const { appURL, webURL } = buildWhatsLinks(defaultWhatsMessage());
      return `Claro! Fale com a gente:<br/><a class="link" href="${appURL}">Abrir no app</a> &nbsp;|&nbsp; <a class="link" href="${webURL}" target="_blank">Abrir no web</a>`;
    }
    if (t.includes('faq')) {
      return `
      <b>FAQ rápido</b><br/>
      • Suporte pós-entrega? <i>Sim, com planos de horas.</i><br/>
      • Tecnologias? <i>React, HTML/JS, Python (FastAPI/Flask), SQL/ETL, integrações.</i><br/>
      • Pagamento? <i>Entrada + marcos/sprints.</i><br/>
      • LGPD/segurança? <i>Boas práticas, logs, métricas e hardening.</i><br/>
      • Como começo? <i>Escreva "Iniciar modo assistido".</i>
      `;
    }
    if (t.includes('dashboard') || t.includes('kpi') || t.includes('bi')) {
      return 'Criamos dashboards com KPIs, funil e metas vs resultados. Integramos dados (ETL/ELT) e configuramos alertas.';
    }
    if (t.includes('api') || t.includes('integra')) {
      return 'Desenvolvemos APIs (FastAPI/Flask) e integrações com ERPs/CRMs, webhooks e filas, com observabilidade.';
    }
    if (t.includes('e-commerce') || t.includes('loja') || t.includes('checkout')) {
      return 'E-commerce com checkout fluido (Pix/Cartão), promoções, SEO e integrações ERP/CRM.';
    }
    if (t.includes('ia') || t.includes('visão') || t.includes('ocr') || t.includes('yolo')) {
      return 'Soluções de IA e Visão: detecção (YOLO), OCR, classificação e automações com modelos em produção.';
    }
    return 'Posso ajudar com serviços, prazos, orçamento ou integrações. Escreva <b>“Iniciar modo assistido”</b> para montar seu briefing 😉';
  }

  document.querySelectorAll('.quick').forEach(q => {
    q.addEventListener('click', () => {
      const msg = q.dataset.q;
      pushUser(msg);
      if (msg.toLowerCase().includes('assistido')) {
        startAssist();
      } else {
        const reply = intentReply(msg);
        if (reply) pushBot(reply);
      }
    });
  });

  bitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = bitInput.value.trim();
    if (!text) return;
    pushUser(text);

    if (state.mode.startsWith('assist_')) {
      handleAssist(text);
    } else {
      const reply = intentReply(text);
      if (reply) pushBot(reply);
    }
    bitInput.value = '';
  });
})();

