/*
 * CONFIGURAÇÃO COMERCIAL DO SITE
 * --------------------------------
 * Este é o principal arquivo para alterações manuais.
 *
 * Regras:
 * - projectUrl: link para abrir o sistema/site. Deixe "" para esconder o botão.
 * - videoUrl: link do YouTube, YouTube Shorts, youtu.be ou arquivo MP4.
 *   Deixe "" enquanto não houver vídeo.
 * - visible: use false para esconder um projeto sem apagá-lo.
 */

window.SALES_TECH_CONFIG = {
  contactEmail: "sales.tech.rr.dev@gmail.com",
  instagramUrl: "https://www.instagram.com/salestech.rr/",

  projects: [
    {
      id: "sales-tech-finance",
      visible: true,
      featured: true,
      category: "Gestão financeira",
      title: "Sales Tech Finance",
      status: "Produto Sales Tech",
      description: "Plataforma de controle financeiro gerencial com receitas, despesas, contas a pagar e receber, estoque, importação de NF-e, conferência bancária e relatórios executivos.",
      tags: ["Financeiro", "Estoque", "NF-e", "OFX", "Relatórios", "Permissões"],
      projectUrl: "",
      projectLabel: "Abrir sistema",
      videoUrl: ""
    },
    {
      id: "meu-inova",
      visible: true,
      featured: false,
      category: "Educação",
      title: "Meu Inova",
      status: "Em homologação",
      description: "Portal acadêmico, financeiro e administrativo com jornadas separadas para alunos, equipe interna, disciplinas, materiais e avaliações online.",
      tags: ["Portal do aluno", "Financeiro", "Avaliações", "Materiais", "Equipe"],
      projectUrl: "",
      projectLabel: "Abrir projeto",
      videoUrl: ""
    },
    {
      id: "iper-dashboard",
      visible: true,
      featured: false,
      category: "Dados · Gestão pública",
      title: "IPER Dashboard",
      status: "Desenvolvido",
      description: "Painel para acompanhamento da arrecadação previdenciária, evolução por fundo, quantidade de servidores, ranking de órgãos, filtros e exportação de dados.",
      tags: ["Indicadores", "Filtros", "Rankings", "Exportação", "Atualização de dados"],
      projectUrl: "",
      projectLabel: "Abrir dashboard",
      videoUrl: ""
    },
    {
      id: "kyok-pa-arena",
      visible: true,
      featured: false,
      category: "Operação de eventos",
      title: "KYOK PA Arena",
      status: "Em homologação",
      description: "Sistema para operação de campeonatos com ambiente administrativo, tatames, juízes, telão, placares, resultados especiais e relatório operacional.",
      tags: ["Campeonato", "Placar", "Juízes", "Tempo real", "Relatórios"],
      projectUrl: "",
      projectLabel: "Abrir projeto",
      videoUrl: ""
    }
  ]
};
