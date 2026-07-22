/** Imagens gerais do site */
export const SITE_IMAGES = {
  salaLudica: {
    src: "/images/ambientes/sala-socializar.png",
    alt: "Sala Socializar da Casa LuBe com balanço, tapete sensorial e brinquedos",
  },
  blocos: {
    src: "/images/lube-blocos-sensoriais.png",
    alt: "Blocos e objetos sensoriais coloridos",
  },
  terapiaOcupacional: {
    src: "/images/ambientes/espaco-crescer-1.png",
    alt: "Ambiente de terapia ocupacional infantil da Casa LuBe",
  },
  natacao: {
    src: "/images/ambientes/espaco-flutuar.png",
    alt: "Espaço de natação terapêutica da Casa LuBe",
  },
  recepcao: {
    src: "/images/ambientes/recepcao-1.png",
    alt: "Recepção da Casa LuBe com balcão, sofá e arco azul",
  },
  fachada: {
    src: "/images/fachada-casa.jpeg",
    alt: "Fachada da Casa LuBe em Fortaleza",
  },
  hero: {
    src: "/images/hero-home.jpeg",
    alt: "Ambiente acolhedor da Casa LuBe — espaço para famílias e crianças",
  },
  /** Foto real da fachada (unidade / contato) */
  heroFachada: {
    src: "/images/hero-casa.jpeg",
    alt: "Fachada da Casa LuBe em Fortaleza",
  },
  musicalizacao: {
    src: "/images/ambientes/sala-humanescer.png",
    alt: "Sala de musicalização da Casa LuBe",
  },
  nutricao: {
    src: "/images/lube-nutricao.png",
    alt: "Composição colorida relacionada à nutrição infantil",
  },
  parquinho: {
    src: "/images/ambientes/parquinho.png",
    alt: "Parquinho externo da Casa LuBe com mesinha, cadeiras coloridas e escorregador",
  },
  salaSocializar: {
    src: "/images/ambientes/sala-socializar.png",
    alt: "Sala Socializar da Casa LuBe com balanço, tapete sensorial e brinquedos",
  },
  salaAfeto: {
    src: "/images/ambientes/sala-afeto.png",
    alt: "Sala Afeto da Casa LuBe — consultório acolhedor com mesa e assento confortável",
  },
} as const;

export type SiteImage = { src: string; alt: string };

/** Uma foto dedicada por serviço — acolhedora e clara */
export const SERVICE_IMAGES: Record<string, SiteImage> = {
  psicoterapia: {
    src: "/images/servicos/svc-psicoterapia.png",
    alt: "Sala acolhedora de psicoterapia infantil",
  },
  "terapia-aba": {
    src: "/images/servicos/svc-terapia-aba.png",
    alt: "Ambiente de Terapia ABA com materiais lúdicos",
  },
  "terapia-ocupacional": {
    src: "/images/ambientes/espaco-crescer-1.png",
    alt: "Sala de terapia ocupacional da Casa LuBe com recursos sensoriais",
  },
  "estimulacao-precoce": {
    src: "/images/servicos/svc-estimulacao-precoce.png",
    alt: "Espaço de estimulação precoce para bebês",
  },
  fonoaudiologia: {
    src: "/images/ambientes/sala-comunicar-1.png",
    alt: "Sala de fonoaudiologia infantil da Casa LuBe",
  },
  fisioterapia: {
    src: "/images/ambientes/sala-reabilitar-1.png",
    alt: "Sala de fisioterapia pediátrica da Casa LuBe",
  },
  psicopedagogia: {
    src: "/images/ambientes/sala-desenvolver-1.png",
    alt: "Ambiente de psicopedagogia da Casa LuBe",
  },
  psicomotricidade: {
    src: "/images/servicos/svc-psicomotricidade.png",
    alt: "Sala de psicomotricidade com circuitos motores",
  },
  nutricao: {
    src: "/images/servicos/svc-nutricao.png",
    alt: "Espaço de orientação nutricional infantil",
  },
  "terapia-alimentar": {
    src: "/images/servicos/svc-terapia-alimentar.png",
    alt: "Ambiente de terapia alimentar acolhedor",
  },
  "neurologia-geral": {
    src: "/images/servicos/svc-neurologia-geral.png",
    alt: "Consultório acolhedor de neurologia",
  },
  "grupo-de-musicalizacao": {
    src: "/images/ambientes/sala-humanescer.png",
    alt: "Sala de grupo de musicalização da Casa LuBe",
  },
  "grupo-de-habilidades-sociais": {
    src: "/images/ambientes/sala-socializar.png",
    alt: "Espaço de grupo de habilidades sociais da Casa LuBe",
  },
  funcional: {
    src: "/images/servicos/svc-funcional.png",
    alt: "Espaço de treino funcional infantil",
  },
  natacao: {
    src: "/images/ambientes/espaco-flutuar.png",
    alt: "Piscina terapêutica da Casa LuBe",
  },
};

/** Fotos reais dos ambientes (1+ por sala). A primeira é a capa. */
export const ROOM_IMAGES: Record<string, SiteImage[]> = {
  "espaco-crescer": [
    {
      src: "/images/ambientes/espaco-crescer-1.png",
      alt: "Espaço Crescer da Casa LuBe — sala de terapia ocupacional com espelho e recursos lúdicos",
    },
    {
      src: "/images/ambientes/espaco-crescer-2.png",
      alt: "Espaço Crescer da Casa LuBe — visão ampla com parede de escalada e equipamentos",
    },
  ],
  "espaco-flutuar": [
    {
      src: "/images/ambientes/espaco-flutuar.png",
      alt: "Espaço Flutuar da Casa LuBe — piscina terapêutica coberta",
    },
  ],
  "sala-comunicar": [
    {
      src: "/images/ambientes/sala-comunicar-1.png",
      alt: "Sala Comunicar da Casa LuBe — estante em formato de casa, espelho e área de brincar",
    },
    {
      src: "/images/ambientes/sala-comunicar-2.png",
      alt: "Sala Comunicar da Casa LuBe — mesa de atendimento, espelho e tapete azul",
    },
  ],
  "sala-desenvolver": [
    {
      src: "/images/ambientes/sala-desenvolver-1.png",
      alt: "Sala Desenvolver da Casa LuBe — balanço terapêutico, estante e área de brincar",
    },
    {
      src: "/images/ambientes/sala-desenvolver-2.png",
      alt: "Sala Desenvolver da Casa LuBe — visão com mesa, espelho e recursos lúdicos",
    },
  ],
  "sala-humanescer": [
    {
      src: "/images/ambientes/sala-humanescer.png",
      alt: "Sala Humanescer da Casa LuBe — espelho, tapete azul, violão e área de brincar",
    },
  ],
  "sala-reabilitar": [
    {
      src: "/images/ambientes/sala-reabilitar-1.png",
      alt: "Sala Reabilitar da Casa LuBe — gaiola terapêutica e recursos de fisioterapia",
    },
    {
      src: "/images/ambientes/sala-reabilitar-2.png",
      alt: "Sala Reabilitar da Casa LuBe — visão ampla com trilho e equipamentos PediaSuit",
    },
  ],
  recepcao: [
    SITE_IMAGES.recepcao,
    {
      src: "/images/ambientes/recepcao-2.png",
      alt: "Cantinho lúdico da recepção da Casa LuBe com livros e brinquedos",
    },
    {
      src: "/images/ambientes/recepcao-3.png",
      alt: "Área de espera da Casa LuBe com sofá, arco azul e portas coloridas",
    },
  ],
  parquinho: [
    SITE_IMAGES.parquinho,
    {
      src: "/images/ambientes/parquinho-2.png",
      alt: "Parquinho da Casa LuBe — visão ampla com pergolado, mesinha e brinquedos",
    },
  ],
  "sala-socializar": [SITE_IMAGES.salaSocializar],
  "sala-afeto": [SITE_IMAGES.salaAfeto],
};

export function getServiceImage(slug: string): SiteImage {
  return SERVICE_IMAGES[slug] ?? SITE_IMAGES.salaLudica;
}

export function getRoomImages(slug: string): SiteImage[] {
  return ROOM_IMAGES[slug] ?? [SITE_IMAGES.salaLudica];
}

export function getRoomImage(slug: string): SiteImage {
  return getRoomImages(slug)[0] ?? SITE_IMAGES.salaLudica;
}
