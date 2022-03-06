import { Tipo } from '../../dispositivo/tipo';

export const TipoDispositivo: Record<string, Tipo> = {
  agrupadorGenerico: {
    tipo: 'DispositivoAgrupadorGenerico',
    name: undefined,
    tagId: 'dg',
    descricao: undefined,
    descricaoPlural: undefined,
    tiposPermitidosPai: ['Articulacao', 'Parte', 'Livro', 'Titulo', 'Capitulo', 'Secao'],
    tiposPermitidosFilhos: ['Parte', 'Livro', 'Titulo', 'Capitulo', 'Secao', 'Artigo'],
    tipoProvavelFilho: 'Artigo',
    INDICADOR_SEQUENCIA: ['NA'],
    INDICADOR_FIM_SEQUENCIA: [''],
    INDICADOR_DESDOBRAMENTO: ['NA'],
  },
  alinea: {
    tipo: 'Alinea',
    name: 'Alinea',
    tagId: 'ali',
    descricao: 'Alínea',
    descricaoPlural: 'Alíneas',
    tiposPermitidosPai: ['Inciso'],
    tiposPermitidosFilhos: ['Item'],
    tipoProvavelFilho: 'Item',
    INDICADOR_SEQUENCIA: [';', '; e', '; ou'],
    INDICADOR_FIM_SEQUENCIA: ['.'],
    INDICADOR_DESDOBRAMENTO: [':'],
  },
  articulacao: {
    tipo: 'Articulacao',
    name: 'Articulacao',
    tagId: '',
    descricao: 'Articulação',
    descricaoPlural: 'Articulações',
    tiposPermitidosPai: [],
    tiposPermitidosFilhos: ['Parte', 'Livro', 'Titulo', 'Capitulo', 'Secao', 'Artigo'],
    tipoProvavelFilho: 'Artigo',
    INDICADOR_SEQUENCIA: ['.'],
    INDICADOR_FIM_SEQUENCIA: ['NA'],
    INDICADOR_DESDOBRAMENTO: [':'],
  },
  artigo: {
    tipo: 'Artigo',
    name: 'Artigo',
    tagId: 'art',
    descricao: 'Artigo',
    descricaoPlural: 'Artigos',
    tiposPermitidosPai: ['Articulacao', 'Parte', 'Livro', 'Titulo', 'Capitulo', 'Secao', 'Subsecao'],
    tiposPermitidosFilhos: ['Paragrafo', 'Inciso'],
    tipoProvavelFilho: 'Inciso',
    INDICADOR_SEQUENCIA: ['.'],
    INDICADOR_FIM_SEQUENCIA: ['NA'],
    INDICADOR_DESDOBRAMENTO: [':'],
  },
  capitulo: {
    tipo: 'Capitulo',
    name: 'Capitulo',
    tagId: 'cap',
    descricao: 'Capítulo',
    descricaoPlural: 'Capítulos',
    tiposPermitidosPai: ['Articulacao', 'Parte', 'Livro', 'Titulo'],
    tiposPermitidosFilhos: ['Secao', 'Artigo'],
    tipoProvavelFilho: 'Artigo',
    INDICADOR_SEQUENCIA: ['NA'],
    INDICADOR_FIM_SEQUENCIA: [''],
    INDICADOR_DESDOBRAMENTO: ['NA'],
  },
  caput: {
    tipo: 'Caput',
    name: 'Caput',
    tagId: 'cpt',
    descricao: 'Caput',
    descricaoPlural: 'Capita',
    tiposPermitidosPai: ['Artigo'],
    tiposPermitidosFilhos: ['Inciso'],
    tipoProvavelFilho: 'Inciso',
    INDICADOR_SEQUENCIA: ['.'],
    INDICADOR_FIM_SEQUENCIA: ['NA'],
    INDICADOR_DESDOBRAMENTO: [':'],
  },
  generico: {
    tipo: 'DispositivoGenerico',
    name: undefined,
    tagId: 'gen',
    descricao: 'Dispositivo genérico',
    descricaoPlural: 'Dispositivos genéricos',
    tiposPermitidosPai: ['Articulacao', 'Parte', 'Livro', 'Titulo', 'Capitulo', 'Secao', 'Subsecao'],
    tiposPermitidosFilhos: ['Paragrafo', 'Inciso', 'Alinea', 'Item'],
    tipoProvavelFilho: 'DispositivoGenerico',
    INDICADOR_SEQUENCIA: [';', '; e', '; ou'],
    INDICADOR_FIM_SEQUENCIA: ['.'],
    INDICADOR_DESDOBRAMENTO: [':'],
  },
  inciso: {
    tipo: 'Inciso',
    name: 'Inciso',
    tagId: 'inc',
    descricao: 'Inciso',
    descricaoPlural: 'Incisos',
    tiposPermitidosPai: ['Artigo', 'Caput', 'Paragrafo'],
    tiposPermitidosFilhos: ['Alinea'],
    tipoProvavelFilho: 'Alinea',
    INDICADOR_SEQUENCIA: [';', '; e', '; ou'],
    INDICADOR_FIM_SEQUENCIA: ['.'],
    INDICADOR_DESDOBRAMENTO: [':'],
  },
  item: {
    tipo: 'Item',
    name: 'Item',
    tagId: 'it',
    descricao: 'Item',
    descricaoPlural: 'Itens',
    tiposPermitidosPai: ['Alinea'],
    tiposPermitidosFilhos: [],
    tipoProvavelFilho: 'DispositivoGenerico',
    INDICADOR_SEQUENCIA: [';', '; e', '; ou'],
    INDICADOR_FIM_SEQUENCIA: ['.'],
    INDICADOR_DESDOBRAMENTO: [':'],
  },
  livro: {
    tipo: 'Livro',
    name: 'Livro',
    tagId: 'liv',
    descricao: 'Livro',
    descricaoPlural: 'Livros',
    tiposPermitidosPai: ['Articulacao', 'Parte'],
    tiposPermitidosFilhos: ['Titulo', 'Capitulo', 'Secao', 'Artigo'],
    tipoProvavelFilho: 'Artigo',
    INDICADOR_SEQUENCIA: ['NA'],
    INDICADOR_FIM_SEQUENCIA: [''],
    INDICADOR_DESDOBRAMENTO: ['NA'],
  },
  omissis: {
    tipo: 'Omissis',
    name: 'Omissis',
    tagId: 'omi',
    descricao: 'Omissis',
    descricaoPlural: 'Linhas pontilhadas (omissis)',
    tiposPermitidosPai: ['Articulacao', 'Parte', 'Livro', 'Titulo', 'Capitulo', 'Secao', 'Subsecao', 'Artigo', 'Caput', 'Paragrafo', 'Alinea', 'Inciso'],
    tiposPermitidosFilhos: ['Parte', 'Livro', 'Titulo', 'Capitulo', 'Secao', 'Subsecao', 'Artigo', 'Paragrafo', 'Alinea', 'Inciso', 'Item'],
    tipoProvavelFilho: undefined,
    INDICADOR_SEQUENCIA: ['NA'],
    INDICADOR_FIM_SEQUENCIA: ['NA'],
    INDICADOR_DESDOBRAMENTO: ['NA'],
  },
  paragrafo: {
    tipo: 'Paragrafo',
    name: 'Paragrafo',
    tagId: 'par',
    descricao: 'Parágrafo',
    descricaoPlural: 'Parágrafos',
    tiposPermitidosPai: ['Artigo'],
    tiposPermitidosFilhos: ['Inciso'],
    tipoProvavelFilho: 'Inciso',
    INDICADOR_SEQUENCIA: ['.'],
    INDICADOR_FIM_SEQUENCIA: ['NA'],
    INDICADOR_DESDOBRAMENTO: [':'],
  },
  parte: {
    tipo: 'Parte',
    name: 'Parte',
    tagId: 'prt',
    descricao: 'Parte',
    descricaoPlural: 'Partes',
    tiposPermitidosPai: ['Articulacao'],
    tiposPermitidosFilhos: ['Livro', 'Titulo', 'Capitulo', 'Secao', 'Artigo'],
    tipoProvavelFilho: 'Artigo',
    INDICADOR_SEQUENCIA: ['NA'],
    INDICADOR_FIM_SEQUENCIA: [''],
    INDICADOR_DESDOBRAMENTO: ['NA'],
  },
  secao: {
    tipo: 'Secao',
    name: 'Secao',
    tagId: 'sec',
    descricao: 'Seção',
    descricaoPlural: 'Seções',
    tiposPermitidosPai: ['Articulacao', 'Parte', 'Livro', 'Titulo', 'Capitulo'],
    tiposPermitidosFilhos: ['Subsecao', 'Artigo'],
    tipoProvavelFilho: 'Artigo',
    INDICADOR_SEQUENCIA: ['NA'],
    INDICADOR_FIM_SEQUENCIA: [''],
    INDICADOR_DESDOBRAMENTO: ['NA'],
  },
  subsecao: {
    tipo: 'Subsecao',
    name: 'Subsecao',
    tagId: 'sub',
    descricao: 'Subseção',
    descricaoPlural: 'Subseções',
    tiposPermitidosPai: ['Secao'],
    tiposPermitidosFilhos: ['Artigo'],
    tipoProvavelFilho: 'Artigo',
    INDICADOR_SEQUENCIA: ['NA'],
    INDICADOR_FIM_SEQUENCIA: [''],
    INDICADOR_DESDOBRAMENTO: ['NA'],
  },
  titulo: {
    tipo: 'Titulo',
    name: 'Titulo',
    tagId: 'tit',
    descricao: 'Título',
    descricaoPlural: 'Títulos',
    tiposPermitidosPai: ['Articulacao', 'Parte', 'Livro'],
    tiposPermitidosFilhos: ['Capitulo', 'Secao', 'Artigo'],
    tipoProvavelFilho: 'Artigo',
    INDICADOR_SEQUENCIA: ['NA'],
    INDICADOR_FIM_SEQUENCIA: [''],
    INDICADOR_DESDOBRAMENTO: ['NA'],
  },
};
