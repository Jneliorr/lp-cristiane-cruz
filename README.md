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

- Logo, retrato e publicação da agenda vieram dos links do Instagram fornecidos no briefing. A publicação datada aparece como material de galeria.
- A [imagem-conceito do hero](public/media/hero-conceito.jpg) registra a composição final. A fotografia de cabelo na seção de especialidade é ilustrativa. Os pares de antes e depois, as avaliações, as fotos de procedimentos e os vídeos permanecem sinalizados até a inclusão de material autorizado.
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

</details>
