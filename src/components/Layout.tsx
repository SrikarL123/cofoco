import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { characters, kits } from '../data/mock'
import { useCart } from '../cart/CartContext'
import MiniCart from './MiniCart'
const TITLES: Record<string, string> = { '/': 'COFOCO — Conscious Form Company', '/shop': 'Shop all kits', '/compare': 'Compare kits', '/cart': 'Your bag', '/checkout': 'Checkout (demo)', '/track': 'Track an order', '/philosophy': 'Our philosophy', '/policies': 'Policies', '/shipping': 'Shipping information', '/returns': 'Returns information', '/privacy': 'Privacy information', '/terms': 'Terms & conditions', '/contact': 'Contact', '/staff': 'Operations (demo)', '/founder': 'Founder dashboard (demo)' }
const NOINDEX = ['/cart', '/checkout', '/confirmation', '/track', '/staff', '/founder']
function pageTitle(p: string) {
  const [, a, b] = p.split('/')
  if (a === 'characters') { const c = characters.find(x => x.slug === b); if (c) return `${c.name} by COFOCO` }
  if (a === 'kits') { const k = kits.find(x => x.slug === b); if (k) return `${k.name} · ${characters.find(x => x.slug === k.character)?.name} by COFOCO` }
  if (a === 'confirmation') return 'Order confirmation (demo)'
  return TITLES[p] ?? 'Page not found'
}
function setMeta(name: string, content: string) {
  let m = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!m) { m = document.createElement('meta'); m.name = name; document.head.appendChild(m) }
  m.content = content
}
export default function Layout() {
  const { count } = useCart(); const { pathname } = useLocation()
  const [open, setOpen] = useState(false); const [menu, setMenu] = useState(false); const [chars, setChars] = useState(false)
  const main = useRef<HTMLElement>(null); const first = useRef(true)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); setOpen(false); setMenu(false); setChars(false)
    const t = pageTitle(pathname); document.title = pathname === '/' ? t : `${t} | COFOCO`
    setMeta('description', 'COFOCO — gym and recovery essentials, assembled as character kits. Demonstration storefront.')
    setMeta('robots', NOINDEX.some(p => pathname.startsWith(p)) ? 'noindex,nofollow' : 'index,follow')
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.1 }); document.querySelectorAll('.band,.strip').forEach(el => { el.classList.add('rv'); io.observe(el) }) }
    if (first.current) first.current = false; else main.current?.focus({ preventScroll: true })
  }, [pathname])
  useEffect(() => { const f = () => setOpen(true); window.addEventListener('cofoco:open-bag', f); return () => window.removeEventListener('cofoco:open-bag', f) }, [])
  useEffect(() => {
    const ok = matchMedia('(hover:hover) and (min-width:1024px) and (prefers-reduced-motion:no-preference)'); const card = (e: Event) => (e.target as Element).closest<HTMLElement>('.card')
    const mv = (e: PointerEvent) => { const c = card(e); if (!c || !ok.matches) return; const b = c.getBoundingClientRect(); c.style.setProperty('--ry', (((e.clientX - b.left) / b.width - 0.5) * 8).toFixed(2) + 'deg'); c.style.setProperty('--rx', (-((e.clientY - b.top) / b.height - 0.5) * 8).toFixed(2) + 'deg') }
    const out = (e: PointerEvent) => { const c = card(e); if (c && !c.contains(e.relatedTarget as Node)) { c.style.removeProperty('--rx'); c.style.removeProperty('--ry') } }
    document.addEventListener('pointermove', mv); document.addEventListener('pointerout', out); return () => { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerout', out) }
  }, [])
  const esc = (e: React.KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setMenu(false); setChars(false) } }
  return <><a className="skip" href="#main">Skip to content</a>
    <header className="top" onKeyDown={esc}><div className="wrap bar"><Link to="/" className="logo">COFOCO</Link>
      <button className="chip nav-toggle" aria-expanded={menu} aria-controls="site-nav" onClick={() => setMenu(v => !v)}>Menu</button>
      <nav id="site-nav" className={'nav' + (menu ? ' open' : '')} aria-label="Primary">
        <NavLink to="/shop">Shop</NavLink>
        <div className="nav-drop"><button aria-expanded={chars} aria-controls="char-panel" onClick={() => setChars(v => !v)}>Characters</button>
          {chars && <div id="char-panel" className="char-panel" role="group" aria-label="Characters">{characters.map(c => <Link key={c.slug} to={`/characters/${c.slug}`}><strong>{c.name}</strong> <span className="muted">{c.quality}</span></Link>)}</div>}</div>
        <NavLink to="/compare">Compare</NavLink><NavLink to="/philosophy">Our philosophy</NavLink><NavLink to="/contact">Support</NavLink>
        <button className="nav-cart" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="mini-cart">Bag ({count})</button></nav></div>
      {open && <div className="wrap mini-wrap"><MiniCart close={() => setOpen(false)} /></div>}</header>
    <main id="main" ref={main} tabIndex={-1}><Outlet /></main>
    <footer><div className="wrap"><div className="foot-grid">
      <div className="foot-brand"><p className="logo">COFOCO</p><p className="foot-name">Conscious Form Company</p><p className="muted">A practice of showing up.</p><p className="muted small">Gym and recovery essentials, assembled as character kits.</p></div>
      <nav aria-label="Characters"><h2 className="foot-h">Characters</h2><ul>{characters.map(c => <li key={c.slug}><Link to={`/characters/${c.slug}`}>{c.name}</Link></li>)}</ul></nav>
      <nav aria-label="Explore"><h2 className="foot-h">Explore</h2><ul><li><Link to="/shop">Shop all kits</Link></li><li><Link to="/compare">Compare kits</Link></li><li><Link to="/philosophy">Our philosophy</Link></li></ul></nav>
      <nav aria-label="Support"><h2 className="foot-h">Support</h2><ul><li><Link to="/contact">Contact</Link></li><li><Link to="/shipping">Shipping</Link></li><li><Link to="/returns">Returns</Link></li><li><Link to="/privacy">Privacy</Link></li><li><Link to="/terms">Terms</Link></li><li><Link to="/track">Track an order</Link></li></ul></nav>
      <nav aria-label="Demo access"><h2 className="foot-h">Demo access</h2><ul><li><Link to="/staff">Operations dashboard (demo)</Link></li><li><Link to="/founder">Founder dashboard (demo)</Link></li></ul></nav>
    </div><div className="foot-bottom"><p>© 2026 COFOCO — Conscious Form Company</p><p>Prices in INR · Demonstration storefront · No real payments are processed.</p></div></div></footer></>
}
