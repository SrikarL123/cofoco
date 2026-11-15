import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { characters, kits } from '../data/mock'
import KitCard from '../components/KitCard'
export default function Home() {
  const hero = useRef<HTMLElement>(null)
  useEffect(() => { const el = hero.current; const ok = matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)'); if (!el || !ok.matches) return
    const mv = (e: PointerEvent) => { const b = el.getBoundingClientRect(); el.style.setProperty('--mx', String((e.clientX - b.left) / b.width * 2 - 1)); el.style.setProperty('--my', String((e.clientY - b.top) / b.height * 2 - 1)) }
    el.addEventListener('pointermove', mv); return () => el.removeEventListener('pointermove', mv) }, [])
  return (<>
    <section className="hero hero-home" ref={hero}><div className="wrap hero-grid"><div className="stack">
      <p className="eyebrow">Conscious Form Company</p>
      <h1>Form is a <em>practice.</em></h1>
      <p className="muted lead-sm">Gym and recovery essentials, assembled as character kits. Every item itemised. Total shown before payment.</p>
      <div className="row"><a className="btn primary" href="#characters">Choose your character</a><Link className="btn" to="/compare">Compare kits</Link></div>
    </div><div className="stage" aria-hidden="true"><div className="float"><div className="obj"><i /><i /><i /><b>COFOCO</b></div></div></div></div></section>
    <section className="strip" aria-label="Highlights"><div className="wrap strip-grid"><p>Six characters</p><p>Every component itemised</p><p>Totals confirmed before payment</p></div></section>
    <section className="band alt" id="characters"><div className="wrap stack">
      <p className="eyebrow">01 · By story</p><h2>Choose your character</h2>
      <div className="grid">{characters.map(c => (
        <Link key={c.slug} to={`/characters/${c.slug}`} data-character={c.slug} className="card"><div className="body stack">
          <div className="rule" /><h3>{c.name} by COFOCO</h3><p className="muted">{c.quality} · {c.cue}</p></div></Link>))}</div>
    </div></section>
    <section className="band"><div className="wrap stack">
      <p className="eyebrow">02 · By what's inside</p><h2>Start with the kit</h2>
      <div className="grid four">{kits.filter(k => k.availability !== 'unavailable').slice(0, 4).map(k => <KitCard key={k.slug} kit={k} />)}</div>
      <Link className="btn" to="/shop">Shop all kits</Link>
    </div></section>
    <section className="band alt"><div className="wrap split stack">
      <div className="stack"><p className="eyebrow">See exactly what you get</p><h2>Two kits. One clear view.</h2><p className="muted">Compare contents, quantities, price and availability before you choose.</p><Link className="btn primary" to="/compare">Compare kits</Link></div>
      <div className="moments" aria-label="Shop by moment"><p className="eyebrow">Shop by moment</p>{characters.map(c => <Link key={c.slug} className="moment" to={`/characters/${c.slug}`}><span>{c.cue}</span><span className="muted">{c.name}</span></Link>)}</div>
    </div></section>
    <section className="band"><div className="wrap stack"><h2 className="statement">Less noise. More intention. Return to the work, one session at a time.</h2><Link className="text-link" to="/philosophy">Read our philosophy</Link></div></section>
    <section className="strip" aria-label="Service"><div className="wrap svc-grid"><Link to="/shipping">Delivery</Link><Link to="/returns">Returns</Link><Link to="/policies">Secure payment (demo)</Link><Link to="/contact">Support</Link></div></section>
  </>)
}
