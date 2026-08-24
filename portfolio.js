(() => {
  const root = document.getElementById('portfolio');
  if (!root) return;

  const projects = [
    {
      kind: 'finance', type: 'SISTEMA EMPRESARIAL', title: 'Controle Financeiro',
      status: 'Projeto entregue', state: 'done',
      description: 'Sistema para centralizar entradas, saídas, fluxo de caixa, categorias e relatórios em uma operação financeira mais simples de acompanhar.',
      tags: ['Fluxo de caixa', 'Dashboard', 'Relatórios', 'Cadastros']
    },
    {
      kind: 'academic', type: 'PORTAL ACADÊMICO', title: 'Meu Inova',
      status: 'Em evolução', state: 'progress',
      description: 'Portal acadêmico, financeiro e administrativo com área do aluno, disciplinas, aulas, avaliações, materiais, cobranças e gestão acadêmica.',
      tags: ['Portal do aluno', 'Financeiro', 'Avaliações', 'Administração']
    },
    {
      kind: 'pension', type: 'DASHBOARD PÚBLICO', title: 'IPER Dashboard',
      status: 'Projeto desenvolvido', state: 'done',
      description: 'Dashboard de arrecadação previdenciária com filtros, indicadores, evolução por fundo, servidores, ranking por órgão e exportação de dados.',
      tags: ['Arrecadação', 'Indicadores', 'Filtros', 'Exportação']
    },
    {
      kind: 'students', type: 'GESTÃO DE ALUNOS', title: 'KYOK PA • Gestão de Alunos',
      status: 'Projeto desenvolvido', state: 'done',
      description: 'Sistema de cadastro e acompanhamento de alunos com faixa, professor, local, matrícula, status, observações, foto e perfis de acesso.',
      tags: ['Alunos', 'Professores', 'Faixas', 'Unidades']
    },
    {
      kind: 'arena', type: 'SISTEMA DE COMPETIÇÃO', title: 'KYOK PA Arena',
      status: 'Versão 2.8 desenvolvida', state: 'done',
      description: 'Operação de campeonato com tatame, placar, rounds, juízes J1/J2/J3, cronologia, W.O., lesão, desistência, desclassificação e relatório pós-evento.',
      tags: ['Placar', 'Juízes', 'Tatame', 'Relatórios']
    },
    {
      kind: 'fitness', type: 'SAAS PARA ACADEMIAS', title: 'FitCore',
      status: 'Em desenvolvimento', state: 'progress',
      description: 'Plataforma de gestão para academias com alunos, planos, cobranças, pagamentos, rotinas mensais e visão administrativa da operação.',
      tags: ['Alunos', 'Planos', 'Cobranças', 'Pagamentos']
    }
  ];

  const browser = (inside, accent = '#5ce8ff') => `
    <svg viewBox="0 0 640 360" aria-hidden="true">
      <defs><linearGradient id="bg-${accent.replace('#','')}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#10233a"/><stop offset="1" stop-color="#081421"/></linearGradient></defs>
      <rect width="640" height="360" rx="22" fill="url(#bg-${accent.replace('#','')})"/>
      <rect x="18" y="18" width="604" height="324" rx="18" fill="#0b1929" stroke="#29445e"/>
      <rect x="18" y="18" width="604" height="42" rx="18" fill="#102139"/>
      <circle cx="42" cy="39" r="5" fill="#5ce8ff"/><circle cx="58" cy="39" r="5" fill="#5b7cff"/><circle cx="74" cy="39" r="5" fill="#91f5c1"/>
      <text x="96" y="44" fill="#8fa4ba" font-size="11" font-weight="700">SALES TECH • VISUAL DO PROJETO</text>
      ${inside}
    </svg>`;

  const sidebar = (active, mark = 'ST') => `
    <rect x="36" y="78" width="112" height="244" rx="16" fill="#0f2338"/>
    <rect x="52" y="96" width="34" height="34" rx="10" fill="#5ce8ff" fill-opacity=".12" stroke="#5ce8ff" stroke-opacity=".35"/>
    <text x="69" y="118" text-anchor="middle" fill="#5ce8ff" font-size="10" font-weight="800">${mark}</text>
    <rect x="50" y="150" width="84" height="25" rx="8" fill="#173a55"/><text x="63" y="167" fill="#fff" font-size="10" font-weight="800">${active}</text>
    <rect x="58" y="202" width="64" height="8" rx="4" fill="#29445e"/><rect x="58" y="232" width="52" height="8" rx="4" fill="#29445e"/><rect x="58" y="262" width="70" height="8" rx="4" fill="#29445e"/>`;

  const cards = (a,b,c, values = ['18.740','31.200','12.460']) => `
    <rect x="166" y="82" width="140" height="72" rx="14" fill="#122942"/><text x="182" y="105" fill="#7890a8" font-size="8">${a}</text><text x="182" y="132" fill="#f5f8fd" font-size="18" font-weight="800">${values[0]}</text>
    <rect x="320" y="82" width="140" height="72" rx="14" fill="#122942"/><text x="336" y="105" fill="#7890a8" font-size="8">${b}</text><text x="336" y="132" fill="#91f5c1" font-size="18" font-weight="800">${values[1]}</text>
    <rect x="474" y="82" width="130" height="72" rx="14" fill="#122942"/><text x="490" y="105" fill="#7890a8" font-size="8">${c}</text><text x="490" y="132" fill="#f5f8fd" font-size="18" font-weight="800">${values[2]}</text>`;

  const chart = (color = '#5ce8ff') => `
    <rect x="166" y="170" width="286" height="152" rx="16" fill="#102139"/>
    <text x="184" y="194" fill="#f5f8fd" font-size="10" font-weight="800">Visão geral</text>
    <line x1="186" y1="286" x2="428" y2="286" stroke="#29445e"/><line x1="186" y1="246" x2="428" y2="246" stroke="#20384f"/><line x1="186" y1="206" x2="428" y2="206" stroke="#20384f"/>
    <polyline points="188,286 218,270 250,275 282,242 316,250 350,218 386,226 424,190" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;

  const visual = (kind) => {
    if (kind === 'finance') return browser(`${sidebar('Visão geral')}${cards('SALDO','ENTRADAS','SAÍDAS',['R$ 18,7k','R$ 31,2k','R$ 12,4k'])}${chart()}<rect x="468" y="170" width="136" height="152" rx="16" fill="#102139"/><circle cx="536" cy="248" r="42" fill="none" stroke="#29445e" stroke-width="18"/><path d="M536 206 A42 42 0 0 1 576 260" fill="none" stroke="#5ce8ff" stroke-width="18"/><path d="M576 260 A42 42 0 0 1 520 286" fill="none" stroke="#5b7cff" stroke-width="18"/><path d="M520 286 A42 42 0 0 1 536 206" fill="none" stroke="#ffab4c" stroke-width="18"/>`);

    if (kind === 'academic') return browser(`${sidebar('Início','MI')}<text x="174" y="99" fill="#f5f8fd" font-size="15" font-weight="800">Portal do aluno</text><rect x="166" y="116" width="205" height="80" rx="14" fill="#122942"/><text x="188" y="145" fill="#fff" font-size="12" font-weight="800">Financeiro</text><text x="188" y="166" fill="#7890a8" font-size="9">Mensalidades e pagamentos</text><rect x="385" y="116" width="219" height="80" rx="14" fill="#122942"/><text x="407" y="145" fill="#fff" font-size="12" font-weight="800">Notas e avaliações</text><text x="407" y="166" fill="#7890a8" font-size="9">Resultados acadêmicos</text><rect x="166" y="212" width="205" height="80" rx="14" fill="#122942"/><text x="188" y="241" fill="#fff" font-size="12" font-weight="800">Aulas e materiais</text><text x="188" y="262" fill="#7890a8" font-size="9">Conteúdo da disciplina</text><rect x="385" y="212" width="219" height="80" rx="14" fill="#122942"/><text x="407" y="241" fill="#fff" font-size="12" font-weight="800">Comunicados</text><text x="407" y="262" fill="#7890a8" font-size="9">Avisos e requerimentos</text>`, '#5b7cff');

    if (kind === 'pension') return browser(`${sidebar('Dashboard','IP')}${cards('ARRECADADO NO ANO','COMPETÊNCIA','SERVIDORES',['R$ 128 mi','R$ 11,7 mi','8.426'])}${chart('#5b7cff')}<rect x="468" y="170" width="136" height="152" rx="16" fill="#102139"/><text x="486" y="194" fill="#fff" font-size="10" font-weight="800">Ranking por órgão</text><rect x="486" y="220" width="92" height="10" rx="5" fill="#5ce8ff"/><rect x="486" y="244" width="73" height="10" rx="5" fill="#5ce8ff"/><rect x="486" y="268" width="55" height="10" rx="5" fill="#5ce8ff"/><rect x="486" y="292" width="38" height="10" rx="5" fill="#5ce8ff"/>`);

    if (kind === 'students') return browser(`${sidebar('Alunos','KP')}${cards('ALUNOS ATIVOS','TURMAS','LOCAIS',['186','14','7'])}<rect x="166" y="170" width="438" height="152" rx="16" fill="#102139"/><text x="184" y="194" fill="#fff" font-size="10" font-weight="800">Cadastro e acompanhamento</text><text x="184" y="222" fill="#7890a8" font-size="8">ALUNO</text><text x="332" y="222" fill="#7890a8" font-size="8">FAIXA</text><text x="410" y="222" fill="#7890a8" font-size="8">PROFESSOR</text><text x="520" y="222" fill="#7890a8" font-size="8">STATUS</text><line x1="184" y1="234" x2="586" y2="234" stroke="#29445e"/><text x="184" y="255" fill="#fff" font-size="9">Ana Souza</text><text x="332" y="255" fill="#fff" font-size="9">Amarela</text><text x="410" y="255" fill="#fff" font-size="9">Felipe</text><text x="520" y="255" fill="#91f5c1" font-size="9">ATIVO</text><line x1="184" y1="268" x2="586" y2="268" stroke="#29445e"/><text x="184" y="289" fill="#fff" font-size="9">Lucas Lima</text><text x="332" y="289" fill="#fff" font-size="9">Verde</text><text x="410" y="289" fill="#fff" font-size="9">Kayo</text><text x="520" y="289" fill="#91f5c1" font-size="9">ATIVO</text>`);

    if (kind === 'arena') return browser(`<text x="40" y="92" fill="#8fa4ba" font-size="10" font-weight="800">TATAME 01 • LUTA EM ANDAMENTO</text><rect x="40" y="116" width="180" height="184" rx="18" fill="#202442"/><text x="70" y="148" fill="#7eb1ff" font-size="11" font-weight="800">ATLETA AZUL</text><text x="118" y="244" fill="#fff" font-size="68" font-weight="900">2</text><rect x="420" y="116" width="180" height="184" rx="18" fill="#3b1d26"/><text x="450" y="148" fill="#ff9a9a" font-size="11" font-weight="800">ATLETA VERMELHO</text><text x="498" y="244" fill="#fff" font-size="68" font-weight="900">1</text><rect x="236" y="116" width="168" height="92" rx="16" fill="#122942"/><text x="289" y="145" fill="#8fa4ba" font-size="10" font-weight="800">ROUND 2</text><text x="281" y="184" fill="#fff" font-size="31" font-weight="900">01:18</text><rect x="236" y="220" width="168" height="80" rx="16" fill="#122942"/><text x="258" y="244" fill="#fff" font-size="10" font-weight="800">JUÍZES ONLINE</text><circle cx="276" cy="274" r="9" fill="#91f5c1"/><circle cx="320" cy="274" r="9" fill="#91f5c1"/><circle cx="364" cy="274" r="9" fill="#91f5c1"/><text x="44" y="326" fill="#7890a8" font-size="9">Cronologia • W.O. • lesão • desistência • desclassificação</text>`, '#ff7f91');

    return browser(`${sidebar('Dashboard','FC')}${cards('ALUNOS ATIVOS','PLANOS ATIVOS','COBRANÇAS',['342','318','R$ 27,6k'])}${chart('#91f5c1')}<rect x="468" y="170" width="136" height="152" rx="16" fill="#102139"/><text x="486" y="194" fill="#fff" font-size="10" font-weight="800">Planos</text><text x="486" y="226" fill="#7890a8" font-size="9">Mensal</text><rect x="528" y="218" width="54" height="10" rx="5" fill="#5ce8ff"/><text x="486" y="258" fill="#7890a8" font-size="9">Trimestral</text><rect x="528" y="250" width="40" height="10" rx="5" fill="#5b7cff"/><text x="486" y="290" fill="#7890a8" font-size="9">Anual</text><rect x="528" y="282" width="26" height="10" rx="5" fill="#91f5c1"/>`, '#91f5c1');
  };

  const css = document.createElement('style');
  css.textContent = `
    #portfolio .portfolio-nav,#portfolio .project-dots{display:none!important}
    .st-project-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:46px}
    .st-project{border:1px solid var(--line);border-radius:22px;background:linear-gradient(145deg,rgba(255,255,255,.038),rgba(255,255,255,.012));overflow:hidden;display:flex;flex-direction:column;min-width:0;transition:.25s ease}
    .st-project:hover{transform:translateY(-5px);border-color:rgba(92,232,255,.28);box-shadow:0 24px 60px rgba(0,0,0,.24)}
    .st-project-visual{position:relative;aspect-ratio:16/9;background:#07111e;border-bottom:1px solid var(--line);overflow:hidden}.st-project-visual svg{width:100%;height:100%;display:block}
    .st-project-visual small{position:absolute;left:12px;bottom:10px;padding:5px 8px;border-radius:999px;background:rgba(4,12,21,.84);border:1px solid rgba(255,255,255,.12);color:#9db0c4;font-size:7px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
    .st-project-body{padding:22px;display:flex;flex-direction:column;flex:1}.st-project-meta{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
    .st-project-type{color:var(--cyan);font-size:8px;font-weight:900;letter-spacing:.13em}.st-project-status{padding:5px 8px;border-radius:999px;font-size:8px;font-weight:850}.st-project-status.done{color:var(--lime);background:rgba(145,245,193,.07);border:1px solid rgba(145,245,193,.16)}.st-project-status.progress{color:#b9c9ff;background:rgba(91,124,255,.09);border:1px solid rgba(91,124,255,.2)}
    .st-project h3{margin:16px 0 9px;font-size:22px;line-height:1.06;letter-spacing:-.035em}.st-project p{margin:0;color:#8fa2b7;font-size:13px;line-height:1.62}
    .st-project-tags{display:flex;gap:7px;flex-wrap:wrap;margin:18px 0 20px}.st-project-tags span{padding:6px 8px;border:1px solid rgba(255,255,255,.07);border-radius:999px;color:#9db0c4;font-size:8px;background:rgba(255,255,255,.018)}.st-project a{margin-top:auto;color:var(--cyan);font-size:11px;font-weight:850}
    .st-project-note{margin-top:24px;padding:18px 20px;border:1px solid rgba(92,232,255,.12);background:rgba(92,232,255,.035);border-radius:18px;display:flex;align-items:center;justify-content:space-between;gap:20px}.st-project-note p{margin:0;color:#93a6ba;font-size:12px}.st-project-note strong{color:#fff}
    @media(max-width:1050px){.st-project-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){.st-project-grid{grid-template-columns:1fr}.st-project-note{align-items:flex-start;flex-direction:column}.st-project h3{font-size:21px}}
  `;
  document.head.appendChild(css);

  root.innerHTML = `<div class="container">
    <div class="portfolio-head"><div class="section-heading compact"><div class="eyebrow"><span></span> PORTFÓLIO</div><h2>Sistemas que já viraram <em>produto.</em></h2><p>Projetos desenvolvidos e evoluídos dentro da Sales Tech, em diferentes segmentos e níveis de maturidade.</p><div class="portfolio-honesty">Os visuais são representações do projeto, não screenshots de produção nem métricas atribuídas a clientes.</div></div></div>
    <div class="st-project-grid">${projects.map(p => `<article class="st-project"><div class="st-project-visual">${visual(p.kind)}<small>Visual ilustrativo do projeto</small></div><div class="st-project-body"><div class="st-project-meta"><span class="st-project-type">${p.type}</span><span class="st-project-status ${p.state}">${p.status}</span></div><h3>${p.title}</h3><p>${p.description}</p><div class="st-project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div><a href="#diagnostico">Quero conversar sobre uma solução parecida →</a></div></article>`).join('')}</div>
    <div class="st-project-note"><p><strong>Tem um processo específico?</strong> O portfólio mostra o que já construímos; o próximo projeto começa pelo diagnóstico da sua operação.</p><a class="button button-ghost" href="#diagnostico">Solicitar diagnóstico</a></div>
  </div>`;
})();