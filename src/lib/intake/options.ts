export const PROJECT_TYPE_OPTIONS = [
  {
    value: "website" as const,
    title: "Site",
    description: "Site institucional, comercial ou experiência digital.",
  },
  {
    value: "landing" as const,
    title: "Landing Page",
    description: "Página focada em campanha, produto, serviço ou geração de leads.",
  },
  {
    value: "application" as const,
    title: "Aplicação / Sistema",
    description: "Sistema, ferramenta interna, plataforma ou aplicação personalizada.",
  },
  {
    value: "ai" as const,
    title: "IA / Automação",
    description: "Automação de processos, integração de sistemas ou soluções com IA.",
  },
  {
    value: "unsure" as const,
    title: "Ainda não tenho certeza",
    description: "Vamos começar pelo problema. A solução aparece depois.",
  },
];

export const WEBSITE_OBJECTIVES = [
  { value: "present-company", label: "Apresentar a empresa" },
  { value: "leads", label: "Gerar leads" },
  { value: "sell", label: "Vender" },
  { value: "services", label: "Apresentar serviços" },
  { value: "products", label: "Apresentar produtos" },
  { value: "brand", label: "Fortalecer marca" },
  { value: "presence", label: "Melhorar presença digital" },
  { value: "other", label: "Outro" },
];

export const WEBSITE_PAGES = [
  { value: "home", label: "Home" },
  { value: "about", label: "Sobre" },
  { value: "services", label: "Serviços" },
  { value: "products", label: "Produtos" },
  { value: "cases", label: "Cases" },
  { value: "team", label: "Equipe" },
  { value: "blog", label: "Blog" },
  { value: "faq", label: "FAQ" },
  { value: "contact", label: "Contato" },
  { value: "client-area", label: "Área do cliente" },
  { value: "other", label: "Outra" },
];

export const WEBSITE_FEATURES = [
  { value: "form", label: "Formulário" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "blog", label: "Blog" },
  { value: "search", label: "Busca" },
  { value: "catalog", label: "Catálogo" },
  { value: "scheduling", label: "Agendamento" },
  { value: "restricted", label: "Área restrita" },
  { value: "newsletter", label: "Newsletter" },
  { value: "integrations", label: "Integrações" },
  { value: "other", label: "Outra" },
];

export const TRAFFIC_SOURCES = [
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "ads", label: "Anúncios" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
  { value: "other", label: "Outro" },
];

export const LANDING_OBJECTIVES = [
  { value: "leads", label: "Gerar leads" },
  { value: "sell", label: "Vender" },
  { value: "schedule", label: "Agendar" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "download", label: "Download" },
  { value: "signup", label: "Cadastro" },
  { value: "other", label: "Outro" },
];

export const LANDING_INTEGRATIONS = [
  { value: "email", label: "E-mail" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "crm", label: "CRM" },
  { value: "sheets", label: "Google Sheets" },
  { value: "api", label: "API" },
  { value: "other", label: "Outro" },
];

export const SOCIAL_PROOF = [
  { value: "testimonials", label: "Depoimentos" },
  { value: "reviews", label: "Avaliações" },
  { value: "cases", label: "Cases" },
  { value: "numbers", label: "Números" },
  { value: "certifications", label: "Certificações" },
  { value: "clients", label: "Clientes" },
  { value: "partners", label: "Parceiros" },
];

export const APP_USERS = [
  { value: "admin", label: "Administrador" },
  { value: "employee", label: "Funcionário" },
  { value: "manager", label: "Gestor" },
  { value: "client", label: "Cliente" },
  { value: "partner", label: "Parceiro" },
  { value: "other", label: "Outro" },
];

export const APP_DATA_TYPES = [
  { value: "clients", label: "Clientes" },
  { value: "products", label: "Produtos" },
  { value: "orders", label: "Pedidos" },
  { value: "documents", label: "Documentos" },
  { value: "employees", label: "Funcionários" },
  { value: "finance", label: "Financeiro" },
  { value: "inventory", label: "Estoque" },
  { value: "other", label: "Outro" },
];

export const APP_DATA_ORIGINS = [
  { value: "excel", label: "Excel" },
  { value: "pdf", label: "PDF" },
  { value: "erp", label: "ERP" },
  { value: "crm", label: "CRM" },
  { value: "database", label: "Banco de dados" },
  { value: "api", label: "API" },
  { value: "manual", label: "Digitação manual" },
  { value: "other", label: "Outro" },
];

export const MATERIAL_TYPES = [
  { value: "logo", label: "Logo" },
  { value: "identity", label: "Identidade visual" },
  { value: "photos", label: "Fotos" },
  { value: "videos", label: "Vídeos" },
  { value: "copy", label: "Textos" },
  { value: "catalogs", label: "Catálogos" },
  { value: "pdfs", label: "PDFs" },
  { value: "spreadsheets", label: "Planilhas" },
  { value: "documents", label: "Documentos" },
  { value: "other", label: "Outros arquivos" },
];

export const BUDGET_RANGES = [
  { value: "undefined", label: "Ainda não definido" },
  { value: "upto-2k", label: "Até R$ 2.000" },
  { value: "2k-5k", label: "R$ 2.000 – R$ 5.000" },
  { value: "5k-10k", label: "R$ 5.000 – R$ 10.000" },
  { value: "above-10k", label: "Acima de R$ 10.000" },
  { value: "talk", label: "Prefiro conversar" },
];

export const SOURCE_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "referral", label: "Indicação" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Outro" },
];

export const INTAKE_STEPS = [
  { id: "type", title: "Tipo de projeto" },
  { id: "company", title: "Empresa" },
  { id: "problem", title: "Problema" },
  { id: "specific", title: "Detalhes" },
  { id: "references", title: "Referências e materiais" },
  { id: "extra", title: "Informações adicionais" },
  { id: "review", title: "Revisão" },
] as const;

export function optionLabel(options: { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function optionLabels(options: { value: string; label: string }[], values: string[]) {
  return values.map((value) => optionLabel(options, value));
}
