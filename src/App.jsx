import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowLeftRight, ArrowRight, ArrowUpRight, Camera, CirclePlay, Globe2, Instagram, MapPin, Menu, MessageCircle, Plus, X } from 'lucide-react'
import HeroAtmosphere from './HeroAtmosphere.jsx'
import { comparisons, countries, gallery, navigation, officialMedia, reviews, salon, services, whatsappLink } from './content.js'

const editorial = '/media/editorial-1120.jpg'

function Brand({ href = '#inicio' }) {
  return (
    <a className="brand" href={href} aria-label="Espaço Cristiane Cruz, início">
      <img src={officialMedia.monogram} alt="" width="43" height="43" />
      <span><small>ESPAÇO</small><strong>Cristiane Cruz</strong></span>
    </a>
  )
}

function ExternalLink({ children, ...props }) {
  return <a target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
}

function updateMagnet(event) {
  if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const button = event.currentTarget
  const bounds = button.getBoundingClientRect()
  button.style.setProperty('--mx', `${(event.clientX - bounds.left - bounds.width / 2) * 0.07}px`)
  button.style.setProperty('--my', `${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px`)
}

function Booking({ children = 'Agende seu horário', service, className = '' }) {
  return (
    <ExternalLink
      className={`button button-gold ${className}`}
      href={whatsappLink(service)}
      onPointerMove={updateMagnet}
      onPointerLeave={({ currentTarget }) => {
        currentTarget.style.removeProperty('--mx')
        currentTarget.style.removeProperty('--my')
      }}
    >
      <span>{children}</span><ArrowUpRight size={17} aria-hidden="true" />
    </ExternalLink>
  )
}

function Eyebrow({ number, children }) {
  return <p className="eyebrow">{number && <span>{number} /</span>}{children}</p>
}

function EditorialPhoto({ className, hero = false }) {
  return (
    <figure className={className} data-reveal={hero ? undefined : ''}>
      <img
        src={editorial}
        srcSet="/media/editorial-640.jpg 640w, /media/editorial-1120.jpg 1120w"
        sizes={hero ? '(max-width: 767px) 92vw, 43vw' : '(max-width: 767px) 92vw, 48vw'}
        alt="Imagem conceitual de cabelo castanho ondulado com reflexos quentes"
        width="1120"
        height="1400"
        loading={hero ? 'eager' : 'lazy'}
        fetchPriority={hero ? 'high' : 'auto'}
      />
      <figcaption>Imagem conceitual</figcaption>
    </figure>
  )
}

function LoadingScreen() {
  const [show, setShow] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (!show) return
    const timer = window.setTimeout(() => setShow(false), 2000)
    return () => window.clearTimeout(timer)
  }, [show])

  if (!show) return null
  return (
    <div className="loader" aria-hidden="true">
      <img src={officialMedia.logo} alt="" width="600" height="534" />
    </div>
  )
}

function Header() {
  const header = useRef(null)
  const toggle = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const element = header.current
    let frame = 0
    function update() {
      frame = 0
      const range = document.documentElement.scrollHeight - window.innerHeight
      element.style.setProperty('--progress', range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0)
      element.classList.toggle('is-scrolled', window.scrollY > 18)
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      resize.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header
      ref={header}
      className={`site-header ${open ? 'menu-open' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          toggle.current.focus()
        }
      }}
    >
      <div className="wrap header-inner flex items-center justify-between">
        <Brand />
        <button ref={toggle} className="menu-toggle icon-button" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav id="site-navigation" className="site-nav" aria-label="Navegação principal">
          {navigation.map(([title, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{title}</a>
          ))}
          <Booking className="mobile-booking" />
        </nav>
        <Booking className="header-booking" />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  )
}

function Hero() {
  const art = useRef(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const figure = art.current
    let frame = 0
    function update() {
      frame = 0
      const offset = motion.matches ? 0 : Math.min(28, Math.max(0, window.scrollY * 0.07))
      figure.style.setProperty('--drift', `${offset}px`)
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    motion.addEventListener('change', update)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      motion.removeEventListener('change', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="hero dark" id="inicio" aria-labelledby="hero-title">
      <HeroAtmosphere />
      <div className="wrap hero-content">
        <div className="hero-copy">
          <Eyebrow>Salão de beleza premium <i /> Itaboraí, RJ</Eyebrow>
          <h1 id="hero-title">A arte de<br /><em>iluminar.</em></h1>
          <p className="hero-description">Especialistas em mechas, iluminados, coloração, alisamentos, tratamentos e cortes. Um espaço para realçar a sua beleza.</p>
          <div className="actions flex flex-wrap items-center">
            <Booking />
            <a className="text-link" href="#servicos">Conhecer os serviços <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
          <div className="hero-authority">
            <span aria-hidden="true">✧</span> Cristiane Cruz <b>·</b> CEO e Embaixadora Internacional
            <a href="#autoridade">Te ensino a fazer mechas do zero</a>
          </div>
        </div>
        <div className="hero-art" ref={art}>
          <img className="hero-watermark" src={officialMedia.monogram} alt="" width="300" height="362" />
          <div className="hero-arc" aria-hidden="true" />
          {officialMedia.heroPortrait ? (
            <figure className="hero-photo hero-portrait">
              <img src={officialMedia.heroPortrait} alt="Cristiane Cruz, CEO do Espaço Cristiane Cruz" width="780" height="780" fetchPriority="high" />
              <figcaption>Cristiane Cruz <span>· CEO</span></figcaption>
            </figure>
          ) : <EditorialPhoto className="hero-photo" hero />}
          <span className="art-sparkle" aria-hidden="true">✦</span>
          <span className="art-index" aria-hidden="true">01 / ESPAÇO DE BELEZA</span>
        </div>
        <div className="hero-meta">
          <ExternalLink href={salon.maps}><MapPin size={15} aria-hidden="true" /> {salon.street}, Itaboraí - RJ</ExternalLink>
          <ExternalLink href={whatsappLink()}><MessageCircle size={15} aria-hidden="true" /> WhatsApp {salon.phone}</ExternalLink>
          <a className="hero-explore" href="#sobre">Explore o espaço <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="sobre">
      <div className="wrap about-layout">
        <div data-reveal>
          <Eyebrow number="01">O espaço</Eyebrow>
          <h2>Beleza que respeita<br />a sua essência.</h2>
        </div>
        <div className="about-copy" data-reveal>
          <p>O Espaço Cristiane Cruz reúne profissionais especializados em Itaboraí. Das mechas ao corte, cada atendimento é uma oportunidade de conversar sobre o seu cabelo e escolher um cuidado que combine com você.</p>
          <p>À frente do salão, Cristiane Cruz é CEO, Embaixadora Internacional e ensina a fazer mechas do zero.</p>
          <a className="text-link" href="#autoridade">Conheça Cristiane Cruz <ArrowDownRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [active, setActive] = useState(0)

  return (
    <section className="section services" id="servicos">
      <div className="wrap">
        <div className="section-heading" data-reveal>
          <div><Eyebrow number="02">Nossos serviços</Eyebrow><h2>Cuidados para<br />cada fio.</h2></div>
          <p>Conheça as especialidades do salão e converse com a equipe sobre o seu próximo atendimento.</p>
        </div>
        <div className="service-layout">
          {officialMedia.services ? (
            <figure className="service-art service-photo" data-reveal>
              <img src={officialMedia.services} alt="Cristiane Cruz com o grupo da imersão e uma modelo com mechas loiras" width="610" height="432" loading="lazy" />
              <figcaption>Imersão em mechas</figcaption>
            </figure>
          ) : (
            <div className="service-art service-placeholder" data-reveal>
              <span className="eyebrow">ESPAÇO CRISTIANE CRUZ</span>
              <img src={officialMedia.monogram} alt="" width="300" height="362" loading="lazy" />
              <ExternalLink className="text-link" href={salon.servicesPost}>Ver publicação do salão <ArrowUpRight size={16} aria-hidden="true" /></ExternalLink>
            </div>
          )}
          <div className="service-list" data-reveal>
            {services.map(({ name, detail }, index) => (
              <div className="service-item" key={name}>
                <h3>
                  <button type="button" aria-expanded={index === active} aria-controls={`service-${index}`} onClick={() => setActive(index === active ? -1 : index)}>
                    <span className="service-index">{String(index + 1).padStart(2, '0')}</span><span>{name}</span><Plus size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div className="service-detail" id={`service-${index}`} hidden={index !== active}>
                  <p>{detail}</p>
                  <ExternalLink className="text-link" href={whatsappLink(name)}>Agendar serviço <ArrowUpRight size={16} aria-hidden="true" /></ExternalLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Specialty() {
  return (
    <section className="section specialty dark" id="especialidade">
      <div className="wrap split-layout">
        <EditorialPhoto className="specialty-photo" />
        <div className="specialty-copy" data-reveal>
          <Eyebrow number="03">Nossa especialidade</Eyebrow>
          <h2>Mechas, luz<br />e <em>movimento.</em></h2>
          <p>Em mechas e iluminados, a escolha do tom e da posição de cada ponto de luz faz diferença. A equipe do Espaço Cristiane Cruz combina técnica e personalização para valorizar a cor, a textura e o movimento do seu cabelo.</p>
          <Booking service="mechas e iluminados">Agendar mechas</Booking>
        </div>
      </div>
    </section>
  )
}

function Comparison({ title, before, after, source }) {
  const [position, setPosition] = useState(50)
  return (
    <figure className="comparison">
      <div className="comparison-stage" style={{ '--position': `${position}%` }}>
        <div className="comparison-layer comparison-after">
          {after ? <img src={after} alt={`${title} depois do atendimento`} loading="lazy" /> : <span className="comparison-placeholder">Foto a incluir</span>}
          <span className="comparison-tag">Depois</span>
        </div>
        <div className="comparison-layer comparison-before">
          {before ? <img src={before} alt={`${title} antes do atendimento`} loading="lazy" /> : <span className="comparison-placeholder">Foto a incluir</span>}
          <span className="comparison-tag">Antes</span>
        </div>
        <div className="comparison-handle" aria-hidden="true"><span><ArrowLeftRight size={18} /></span></div>
        <input type="range" min="0" max="100" value={position} aria-label={`Comparar antes e depois de ${title}`} aria-valuetext={`${position}% da imagem de antes`} onChange={(event) => setPosition(Number(event.target.value))} />
      </div>
      <figcaption>
        {title}
        {source
          ? <ExternalLink className="text-link" href={source} aria-label={`Ver reel original de ${title}`}>Ver reel original <ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>
          : <span>{before && after ? 'Antes e depois' : 'Aguardando fotos autorizadas'}</span>}
      </figcaption>
    </figure>
  )
}

function Results() {
  return (
    <section className="section results" id="resultados">
      <div className="wrap">
        <div className="section-heading" data-reveal>
          <div><Eyebrow number="04">Resultados</Eyebrow><h2>Antes e depois.</h2></div>
          <p>{comparisons.some(({ before, after }) => before && after) ? 'Deslize para comparar os frames e veja os vídeos originais no Instagram.' : 'Os comparadores estão prontos para receber os registros autorizados do salão.'}</p>
        </div>
        <div className="comparison-grid grid gap-5 md:grid-cols-2">
          {comparisons.map((comparison) => <Comparison key={comparison.title} {...comparison} />)}
        </div>
      </div>
    </section>
  )
}

function Authority() {
  return (
    <section className="section authority" id="autoridade">
      <div className="wrap authority-layout">
        <div className="authority-mark" data-reveal>
          {officialMedia.authorityPortrait
            ? <img className="authority-portrait" src={officialMedia.authorityPortrait} alt="Cristiane Cruz de blazer branco no salão" width="704" height="800" loading="lazy" />
            : <img src={officialMedia.monogram} alt="" width="300" height="362" loading="lazy" />}
          <ExternalLink className="text-link" href={salon.authorityPost}>Ver publicação no Instagram <ArrowUpRight size={16} aria-hidden="true" /></ExternalLink>
        </div>
        <div data-reveal>
          <Eyebrow number="05">CEO · Embaixadora Internacional</Eyebrow>
          <h2>Cristiane Cruz.</h2>
          <p className="authority-quote">“Te ensino a fazer mechas do zero”</p>
          <p>Além de liderar o Espaço Cristiane Cruz, Cristiane compartilha sua experiência com profissionais que querem aprender a fazer mechas.</p>
          <div className="country-heading"><Globe2 size={18} aria-hidden="true" /> Conexões internacionais</div>
          <ul className="countries">{countries.map((country) => <li key={country}>{country}</li>)}</ul>
          <ExternalLink className="text-link authority-reference" href={salon.reference}>Referência profissional @robsonpeluquero <ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const hasReviews = reviews.length > 0

  return (
    <section className={`section reviews${hasReviews ? '' : ' section--compact'}`} id="avaliacoes">
      <div className="wrap">
        <div className="section-heading" data-reveal>
          <div>
            <Eyebrow number="06">Avaliações</Eyebrow>
            <h2>Experiências reais.</h2>
            {!hasReviews && <p className="section-note">Consulte as avaliações disponíveis no perfil do salão.</p>}
          </div>
          <ExternalLink className="text-link" href={salon.maps}>Ver no Google Maps <ArrowUpRight size={17} aria-hidden="true" /></ExternalLink>
        </div>
        {hasReviews && (
          <div className="masonry review-grid">
            {reviews.map(({ name, quote }) => (
              <figure key={`${name}-${quote}`}><blockquote>{quote}</blockquote><figcaption>{name}</figcaption></figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Modal({ title, children, onClose, className = '' }) {
  const dialog = useRef(null)
  useEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => element.close()
  }, [])

  function close() {
    dialog.current.close()
    onClose()
  }

  return (
    <dialog
      className={`modal ${className}`}
      ref={dialog}
      aria-label={title}
      onCancel={(event) => { event.preventDefault(); close() }}
      onClick={(event) => { if (event.target === event.currentTarget) close() }}
    >
      <div className="modal-content">
        <button type="button" className="icon-button modal-close" aria-label="Fechar" onClick={close}><X size={22} /></button>
        {children}
      </div>
    </dialog>
  )
}

function Gallery() {
  const [selected, setSelected] = useState(null)
  const media = gallery.filter((item) => item.src || item.link)
  const compact = media.length < 3

  return (
    <section className={`section gallery dark${compact ? ' section--compact' : ''}`} id="galeria">
      <div className="wrap">
        <div className="section-heading" data-reveal>
          <div>
            <Eyebrow number="07">Galeria</Eyebrow>
            <h2>Por dentro do espaço.</h2>
            {compact && <p className="section-note">Acompanhe outros registros no Instagram.</p>}
          </div>
          <ExternalLink className="text-link" href={salon.instagram}><Instagram size={17} aria-hidden="true" /> @espaco_cristianecruz <ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>
        </div>
        {media.length > 0 && (
          <div className="masonry gallery-grid">
            {media.map((item, index) => (
              <button className="gallery-tile" key={item.title} type="button" onClick={() => setSelected(item)}>
                {item.type === 'image' && item.src && <img src={item.src} alt="" loading="lazy" />}
                {item.type === 'video' && item.poster && <img src={item.poster} alt="" loading="lazy" />}
                <span className="tile-index" aria-hidden="true">0{index + 1}</span>
                <span className="tile-icon" aria-hidden="true">{item.type === 'video' ? <CirclePlay /> : <Camera />}</span>
                <span className="tile-label"><span>{item.title}{!item.src && <small>Publicação no Instagram</small>}</span><ArrowUpRight size={17} aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        )}
      </div>
      {selected && (
        <Modal title={selected.title} className="lightbox" onClose={() => setSelected(null)}>
          <h3>{selected.title}</h3>
          {selected.src && selected.type === 'image' && <img src={selected.src} alt={selected.alt || selected.title} />}
          {selected.src && selected.type === 'video' && (
            <video controls playsInline preload="metadata" src={selected.src} poster={selected.poster}>
              {selected.captions && <track kind="captions" src={selected.captions} srcLang="pt-BR" label="Português" default />}
            </video>
          )}
          {selected.link && <ExternalLink className="text-link" href={selected.link}>Ver publicação no Instagram <ArrowUpRight size={17} aria-hidden="true" /></ExternalLink>}
        </Modal>
      )}
    </section>
  )
}

function Location() {
  return (
    <section className="section location" id="localizacao">
      <div className="wrap split-layout">
        <div data-reveal>
          <Eyebrow number="08">Onde encontrar</Eyebrow>
          <h2>Seu próximo<br />encontro é aqui.</h2>
          <address>
            <strong>{salon.name}</strong>
            <span>{salon.street}<br />Itaboraí - RJ, 24800-105, Brasil</span>
            <a href={salon.phoneLink}>{salon.phone}</a>
          </address>
          <div className="actions flex flex-wrap items-center">
            <Booking>Agendar no WhatsApp</Booking>
            <ExternalLink className="text-link" href={salon.maps}>Como chegar <ArrowUpRight size={17} aria-hidden="true" /></ExternalLink>
          </div>
        </div>
        <div className="map">
          <iframe title="Mapa do Espaço Cristiane Cruz em Itaboraí" src={`https://maps.google.com/maps?q=${encodeURIComponent(salon.address)}&z=16&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [privacy, setPrivacy] = useState(false)
  return (
    <footer className="site-footer dark">
      <div className="wrap">
        <div className="footer-cta" data-reveal>
          <div><Eyebrow>Agende sua visita</Eyebrow><h2>Seu próximo cuidado de<br />beleza <em>começa aqui.</em></h2></div>
          <Booking />
        </div>
        <div className="footer-details">
          <Brand />
          <nav aria-label="Navegação do rodapé">{navigation.map(([title, href]) => <a key={href} href={href}>{title}</a>)}</nav>
          <div className="footer-contact">
            <ExternalLink href={salon.instagram}><Instagram size={16} aria-hidden="true" /> Instagram</ExternalLink>
            <ExternalLink href={whatsappLink()}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</ExternalLink>
            <ExternalLink href={salon.maps}>{salon.street}, Itaboraí - RJ</ExternalLink>
          </div>
        </div>
        <div className="footer-legal"><span>© {new Date().getFullYear()} Espaço Cristiane Cruz. Todos os direitos reservados.</span><button type="button" onClick={() => setPrivacy(true)}>Política de privacidade</button><a href="#inicio">Voltar ao topo ↑</a></div>
      </div>
      {privacy && (
        <Modal title="Política de privacidade" onClose={() => setPrivacy(false)}>
          <h3>Política de privacidade</h3>
          <p>Esta página não possui formulários de cadastro. Se você nos contatar pelo WhatsApp, as informações que compartilhar serão usadas para responder à sua mensagem e tratar do seu agendamento.</p>
          <p>O mapa incorporado utiliza o Google Maps. Ao usar o mapa ou abrir o Instagram e o WhatsApp, sua interação está sujeita às práticas de privacidade desses serviços.</p>
          <p>Para falar sobre seus dados, entre em contato pelo <ExternalLink className="text-link" href={whatsappLink()}>WhatsApp do salão</ExternalLink>.</p>
        </Modal>
      )}
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <LoadingScreen />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <Specialty />
        <Results />
        <Authority />
        <Reviews />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </>
  )
}
