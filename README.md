# Espaço Cristiane Cruz

Landing page em português para o salão de beleza em Itaboraí, RJ. O agendamento abre o WhatsApp com uma mensagem pré-preenchida.

## Executar o projeto

```sh
npm ci
npm run dev
npm run build
npm run preview
```

O build estático fica em `dist/`. Os dados do salão, links, catálogo e espaços reservados para mídia ficam em `src/content.js`. O título, os metadados de compartilhamento e os dados estruturados locais ficam em `index.html`.

## Direção criativa

O sorteio selecionou o estilo Suíço/Internacional, reinterpretado para uma landing page de rolagem contínua. Uma grade precisa organiza o retrato de Cristiane, a informação e os espaços livres. O oliva profundo da marca dá intimidade à abertura, o dourado aquece os pontos de atenção e o champagne traz luminosidade às seções que convidam a explorar o salão. O conjunto procura transmitir confiança, acolhimento e a sensação de um cuidado pensado para cada pessoa.

Os títulos em Playfair Display combinam a presença de uma manchete editorial com a delicadeza do itálico. A Manrope dá clareza à navegação, aos contatos e às descrições. O movimento suave do WebGL acompanha a entrada, enquanto as transições de texto e imagem marcam a passagem pelo salão, pela especialidade em mechas e pela autoridade de Cristiane. O agendamento reaparece em pontos em que a visitante já tem contexto para iniciar uma conversa.

A composição parte da fotografia de campanha de beleza, das curvas de um arco arquitetônico e do contraste entre papel champagne e metal dourado fosco. O retrato recortado em primeiro plano, a luz difusa e o monograma ampliado dão profundidade à abertura. Nas seções seguintes, fios de cabelo em close, filetes finos e blocos de respiro levam a mesma linguagem da campanha às informações práticas.

## Conteúdo e imagens

- A abertura usa uma restauração assistida por IA da [miniatura original de 150 × 150 px](public/media/cristiane-cruz-perfil.jpg), obtida do [perfil de Cristiane](https://www.instagram.com/cristianecruzrp/). A seção de autoridade usa um recorte da [publicação indicada](https://www.instagram.com/p/DI46ylssY5f/).
- A foto da imersão em Serviços foi anexada ao comentário do site. Os comparadores usam frames do [reel de iluminados caramelo](https://www.instagram.com/reel/DfGPQHVupXR/) nos instantes 0,75 s e 3,70 s e do [reel de alisamento](https://www.instagram.com/reel/DdrH5PXuB3G/) nos instantes 5,02 s e 46,70 s.
- A [imagem-conceito do hero](public/media/hero-conceito.jpg) registra a composição final. A fotografia de cabelo na seção de especialidade é ilustrativa. As avaliações, as fotos de procedimentos e os vídeos da galeria permanecem sinalizados até a inclusão de material autorizado.
- História biográfica e formação acadêmica podem ser incluídas quando houver informação confirmada.
- O mapa consulta o endereço do briefing. O botão de trajeto abre o link do Google Maps fornecido.

<details>
<summary>Prompts de imagem utilizados na ferramenta nativa</summary>

**Fotografia conceitual**

Use case: ads-marketing. Create an editorial hero photograph for a refined Brazilian hair salon's website art-direction concept, vertical 4:5, no text, no logos. Anonymous fashion model facing AWAY from camera, absolutely no visible face, photographed from upper back in a sleek dark olive satin blazer. Her long luxuriant loosely waved dark brunette hair with delicate warm honey/champagne highlights is the protagonist, rendered with richly realistic fine strands. She is centered in the photo slightly to the right, crown of head comfortably inside the image, large enough to fill the frame, jacket disappears at bottom. Warm studio directional window light hitting her hair from the right, deep warm dark olive and umber shadow on the left, flat mottled beige-olive wall, restrained warm vintage magazine tones and finely organic grain. Chic Swiss editorial layout material, polished but natural, subtle luminous texture. Make an attractive plausible concept photograph of a model; no identity or salon result is implied. No typography, no border.

**Recorte do retrato**

Use case: background-extraction. Edit the supplied actual portrait of Cristiane Cruz. Remove only the entire retail shelf background to produce a professional clean cutout against actual transparency (alpha), including the holes between her raised arm and torso, and preserve all foreground pixels of the original woman, expression, identity, facial features, skin tone, hairstyle, hands, black clothes, pose, bag and the same square image boundaries. No redesign, no retouch or beautification, no enhancement or reconstruction of identity, no new objects, no added lighting, no fake background or checker pattern. Maintain natural fine hair edges. Source is the user's Instagram reference photograph. Render at original framing.

**Recorte da marca**

Clean flat two-color logo asset on true transparent background. Precisely extract the original monogram and lettering from the supplied green logo image: the stylized intertwined C and E, the exact thin original fashion serif text CRISTIANE CRUZ, and the exact small gold line ESPAÇO DE BELEZA. Use solid matte gold and warm off-white matching the source, no shading or decoration. The removed green field and all glyph counters must be completely zero-alpha, with only a normal one-pixel antialiased edge. Strictly avoid fringe, colored specks, outlines, halos, drop shadows, embossing and extraneous pixels. Do not stylistically reinterpret the mark. Tight transparent padding around the source artwork. Production-quality clean flat PNG brand graphic.

**Restauração da foto de perfil**

Use case: identity-preserve background extraction and photo restoration. Image 1 is the low-resolution ORIGINAL edit target: Cristiane Cruz standing by the tall black chair in a black leather blazer. The final image must be that exact photograph, at that same moment, silhouette, stance, camera angle, sideward gaze, expression, face direction, outfit, hands, chair and mid-calf crop. Image 2 is a sharper photo of THE SAME REAL PERSON for facial identity reference only; never borrow its makeup, smile, head tilt, clothes, background, hands or pose. Restore clarity and reduce pixel blur in image 1 while keeping the exact real facial structure of Cristiane, with especially restrained and natural detail and no glamour retouch. Match the original facial orientation precisely: she looks off camera slightly to the viewer's left, her lips rest softly with a slight asymmetric expression, and her head is tilted a little. Keep the original short dark side-parted bob. Remove the gray backdrop completely, including the small triangle under the raised arm and the space between the chair legs. Transparent alpha PNG, square composition at the same original scale and same exact framing. No white or gray fringe, no backdrop, no text, no changes to pose, no styling.

</details>
