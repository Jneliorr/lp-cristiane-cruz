export const salon = {
  name: 'Espaço Cristiane Cruz',
  city: 'Itaboraí · RJ',
  street: 'Rua Antônio José de Marins, 160',
  address: 'Rua Antônio José de Marins, 160, Itaboraí - RJ, 24800-105, Brasil',
  phone: '(21) 92008-1063',
  phoneLink: 'tel:+5521920081063',
  whatsapp: '5521920081063',
  message: 'Olá! Conheci o Espaço Cristiane Cruz pelo site e gostaria de saber mais sobre os serviços e agendar um horário.',
  instagram: 'https://www.instagram.com/espaco_cristianecruz/',
  portraitPost: 'https://www.instagram.com/p/Dc7I69Emfii/?img_index=1',
  authorityPost: 'https://www.instagram.com/p/DI46ylssY5f/',
  servicesPost: 'https://www.instagram.com/p/DfRy34vFRP3/?img_index=1',
  logoPost: 'https://www.instagram.com/p/CzT-lPCOTK-/',
  maps: 'https://maps.app.goo.gl/pGJ5wCTpxmcQcySE8',
  reference: 'https://www.instagram.com/robsonpeluquero/',
}

// Add approved local files here when the official assets are available.
export const officialMedia = {
  logo: '/media/logo-cristiane-cruz.png',
  monogram: '/media/monograma-cristiane-cruz.png',
  heroPortrait: '/media/cristiane-cruz-perfil.jpg',
  authorityPortrait: '/media/cristiane-cruz-autoridade.webp',
  services: null,
}

export const navigation = [
  ['Sobre', '#sobre'],
  ['Serviços', '#servicos'],
  ['Resultados', '#resultados'],
  ['Galeria', '#galeria'],
  ['Localização', '#localizacao'],
]

export const services = [
  { name: 'Mechas e iluminados', detail: 'Pontos de luz e nuances escolhidos para valorizar sua cor e emoldurar o rosto.' },
  { name: 'Coloração exclusiva', detail: 'Da renovação da cor a uma mudança de tom, com escolhas alinhadas ao seu estilo.' },
  { name: 'Corte personalizado', detail: 'Um corte pensado para o movimento, a textura e a rotina do seu cabelo.' },
  { name: 'Tratamentos profissionais', detail: 'Cuidados capilares escolhidos de acordo com o que seus fios precisam.' },
  { name: 'Alisamento', detail: 'Técnica de alisamento com atenção à condição dos fios e ao caimento.' },
]

export const countries = ['Brasil', 'França', 'Argélia', 'Argentina', 'Paraguai']

export const comparisons = [
  { title: 'Mechas', before: null, after: null },
  { title: 'Iluminados', before: null, after: null },
]

export const reviews = []

export const gallery = [
  { title: 'O espaço', type: 'image', src: null },
  { title: 'Cristiane Cruz', type: 'image', src: '/media/cristiane-cruz-original.jpg', link: salon.portraitPost },
  { title: 'Publicação do salão', type: 'image', src: '/media/publicacao-agenda.jpg', alt: 'Publicação sobre a agenda de dezembro de 2026 com a lista de serviços do salão', link: salon.servicesPost },
  { title: 'Procedimentos', type: 'image', src: officialMedia.services },
  { title: 'Bastidores', type: 'video', src: null },
  { title: 'Resultados', type: 'image', src: null },
  { title: 'A equipe', type: 'image', src: null },
]

export function whatsappLink(service) {
  const message = service ? `${salon.message} Tenho interesse em ${service.toLowerCase()}.` : salon.message
  return `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(message)}`
}
