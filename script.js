// === WhatsApp (form) ===
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const WHATSAPP_NUMBER = '5521999743004';

if (contactForm) {
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

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    formMessage?.classList?.remove('hidden');
    window.open(url, '_blank');
    contactForm.reset();
  });
}

// === Reveal on Scroll ===
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('reveal-show'); });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// === Projetos: conteúdo do modal (Desafio/Solução/Impacto) ===
const PROJECTS = {
  adocique: {
    title: 'Adociquê — Site de Páscoa',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Melhorar a experiência de compra de doces de Páscoa, centralizando o catálogo e simplificando o processo de pedido.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Site e-commerce estático com catálogo interativo e carrinho de compras integrado ao WhatsApp.</p>
      <p><b class="text-[#00c7e5]">Impacto:</b> Clientes montam pedidos de forma intuitiva e o vendedor recebe o resumo organizado, otimizando o tempo.</p>
    `,
    link: '#'
  },
  blogpessoal: {
    title: 'Blog Pessoal',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Criar uma plataforma pessoal de escrita com layout responsivo e fácil de usar.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Blog feito do zero, posts em Markdown, comentários e design adaptável.</p>
      <p><b class="text-[#00c7e5]">Impacto:</b> Publicação ágil, visual agradável e baixa manutenção.</p>
    `,
    link: '#'
  },
  sistemagestao: {
    title: 'Sistema de Gestão de Clientes',
    html: `
      <p><b class="text-[#00c7e5]">Desafio:</b> Aumentar a eficiência no gerenciamento de clientes e no rastreio de vendas.</p>
      <p><b class="text-[#00c7e5]">Solução:</b> Sistema web com dashboards interativos e relatórios de vendas.</p>
      <p><b class="text-[#00c7e5]">Impacto:</b> Decisões mais rápidas, baseadas em dados, melhorando a gestão.</p>
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
  }
};

// === Modal handlers ===
const projectModal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modal-content-container');
const modalLink = document.getElementById('modalLink');

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

// === Carrossel dentro de cada CARD ===
document.querySelectorAll('.project-carousel').forEach((wrap) => {
  const slides = wrap.querySelector('.slides');
  const imgs = slides.querySelectorAll('img');
  let idx = 0;

  function go(i){
    idx = (i + imgs.length) % imgs.length;
    slides.style.transform = `translateX(${-idx*100}%)`;
  }
  wrap.querySelector('.prev').addEventListener('click', () => go(idx-1));
  wrap.querySelector('.next').addEventListener('click', () => go(idx+1));

  // auto-play leve
  setInterval(() => go(idx+1), 5500);
});

// ===== Assistente Virtual: Bit (mais completo) =====
const bitToggle = document.getElementById('bit-toggle');
const bitChat = document.getElementById('bit-chat');
const bitClose = document.getElementById('bit-close');
const bitMessages = document.getElementById('bit-messages');
const bitForm = document.getElementById('bit-form');
const bitInput = document.getElementById('bit-input');

bitToggle.addEventListener('click', () => bitChat.style.display = 'flex');
bitClose.addEventListener('click', () => bitChat.style.display = 'none');

function push(type, html){
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.innerHTML = html;
  bitMessages.appendChild(div);
  bitMessages.scrollTop = bitMessages.scrollHeight;
}
function pushUser(text){ push('user', text); }
function pushBot(text){ push('bot', text); }

// FSM simples do “modo assistido”
const state = {
  mode: 'idle', // idle | assist_name | assist_tech | assist_problem | assist_scope | assist_deadline | assist_budget | assist_done
  brief: { name:'', tech:'', problem:'', scope:'', deadline:'', budget:'', email:'' }
};

function resetAssist(){
  state.mode = 'idle';
  state.brief = { name:'', tech:'', problem:'', scope:'', deadline:'', budget:'', email:'' };
}

function startAssist(){
  resetAssist();
  state.mode = 'assist_name';
  pushBot('Perfeito! Vamos montar seu briefing em 6 passos. <br/><b>1)</b> Qual seu <b>nome</b>?');
}

function handleAssist(input){
  const t = input.trim();

  switch(state.mode){
    case 'assist_name':
      state.brief.name = t;
      state.mode = 'assist_tech';
      pushBot('<b>2)</b> Qual <b>tecnologia</b> você quer? (Website, WordPress, Mobile, API Python, Dashboard, Banco de Dados, IA/Visão, E-commerce ou outra)');
      break;
    case 'assist_tech':
      state.brief.tech = t;
      state.mode = 'assist_problem';
      pushBot('<b>3)</b> Qual o <b>problema/objetivo</b>? (ex.: integração com API, checkout, dashboard de KPIs...)');
      break;
    case 'assist_problem':
      state.brief.problem = t;
      state.mode = 'assist_scope';
      pushBot('<b>4)</b> Descreva <b>rapidamente o escopo</b> (ex.: páginas, recursos, integrações).');
      break;
    case 'assist_scope':
      state.brief.scope = t;
      state.mode = 'assist_deadline';
      pushBot('<b>5)</b> Qual o <b>prazo desejado</b>? (ex.: 30 dias)');
      break;
    case 'assist_deadline':
      state.brief.deadline = t;
      state.mode = 'assist_budget';
      pushBot('<b>6)</b> Tem <b>orçamento</b> estimado? (opcional) Se não, pode dizer "sem".');
      break;
    case 'assist_budget':
      state.brief.budget = t.toLowerCase()==='sem' ? '' : t;
      state.mode = 'assist_done';
      // Monta link do WhatsApp
      const lines = [
        `*Briefing via Assistente Bit*`,
        ``,
        `*Nome:* ${state.brief.name}`,
        `*Tecnologia:* ${state.brief.tech}`,
        `*Problema/Objetivo:* ${state.brief.problem}`,
        `*Descrição:* ${state.brief.scope}`,
        state.brief.deadline ? `*Prazo desejado:* ${state.brief.deadline}` : null,
        state.brief.budget ? `*Orçamento:* ${state.brief.budget}` : null
      ].filter(Boolean);
      const msg = encodeURIComponent(lines.join('\n'));
      const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
      pushBot(`Fechou! Pode enviar seu briefing no WhatsApp: <br/><a target="_blank" class="link" href="${link}">👉 Abrir WhatsApp agora</a>`);
      resetAssist();
      break;
    default:
      // nada
      break;
  }
}

// Respostas por intenção (FAQ + roteamento)
function intentReply(text){
  const t = text.toLowerCase();

  // inicia modo assistido
  if (t.includes('assistido') || t.includes('briefing') || t.includes('orçamento rápido') || t.includes('iniciar')) {
    startAssist();
    return null;
  }

  // serviços
  if (t.includes('serviço') || t.includes('servicos') || t.includes('oferecem')) {
    return 'Oferecemos <b>Web & Apps</b>, <b>APIs & Integrações</b>, <b>Data & Analytics</b>, <b>E-commerce</b>, <b>IA & Visão</b> e <b>Infra & Segurança</b>. Quer detalhar algum?';
  }
  // prazos
  if (t.includes('prazo') || t.includes('tempo')) {
    return 'Prazo típico de <b>site institucional</b>: 2–4 semanas. Sistemas/integrações variam conforme escopo. Qual é seu prazo desejado?';
  }
  // orçamento
  if (t.includes('preço') || t.includes('orc') || t.includes('orçamento') || t.includes('valor')) {
    return 'Podemos trabalhar com <b>escopo fechado</b> ou por <b>sprints</b>. Se quiser, digite <b>“Iniciar modo assistido”</b> que eu preparo um briefing e já te levo pro WhatsApp.';
  }
  // humano
  if (t.includes('humano') || t.includes('vendedor') || t.includes('atendente') || t.includes('falar')) {
    const link = `https://wa.me/${WHATSAPP_NUMBER}`;
    return `Claro! Fale com a gente no WhatsApp: <a target="_blank" class="link" href="${link}">abrir conversa</a>.`;
  }
  // faq
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

  // menção a tecnologias específicas
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

// quick replies
document.querySelectorAll('.quick').forEach(q => {
  q.addEventListener('click', () => {
    const msg = q.dataset.q;
    pushUser(msg);
    // se for modo assistido, inicia fluxo
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
  if(!text) return;
  pushUser(text);

  // Se está no modo assistido, encaminha FSM
  if (state.mode.startsWith('assist_')) {
    handleAssist(text);
  } else {
    const reply = intentReply(text);
    if (reply) pushBot(reply);
  }

  bitInput.value = '';
});
