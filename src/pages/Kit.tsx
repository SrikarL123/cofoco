import { Link, useParams } from 'react-router-dom'
import { charOf, inr, kits, label } from '../data/mock'
import { useCart } from '../cart/CartContext'
import ShippingReturns from '../components/ShippingReturns'
import KitCard from '../components/KitCard'
import NotFound from './NotFound'
export default function KitPage() {
  const { slug } = useParams(); const kit = kits.find(k => k.slug === slug); const { add } = useCart()
  if (!kit) return <NotFound />
  const ch = charOf(kit.character); const off = kit.availability === 'unavailable'
  const alts = kits.filter(k => k.availability !== 'unavailable' && k.slug !== kit.slug).slice(0, 3)
  const items = kit.components.reduce((a, x) => a + x.qty, 0)
  return (<section className="band" data-character={ch.slug}><div className="wrap split">
    <div className="ph" role="img" aria-label={`Placeholder image for ${kit.name}`}>Placeholder — {ch.name} {kit.name}</div>
    <div className="stack">
      <p className="eyebrow"><Link to={`/characters/${ch.slug}`}>{ch.name} by COFOCO</Link> / {kit.name}</p>
      <h1 style={{ fontSize: 'clamp(36px,5vw,64px)' }}>{kit.name}</h1><p className="muted">{kit.descriptor}</p>
      <p className="num" style={{ fontSize: 24, color: 'var(--gold)' }}>{inr(kit.price)} {kit.compareAt && <s className="muted" style={{ fontSize: 16 }}>{inr(kit.compareAt)}</s>}</p>
      <ShippingReturns />
      <p><span className="pill">{label[kit.availability]}</span></p>
      <button className="btn primary" disabled={off} onClick={() => { add(kit.slug); window.dispatchEvent(new Event('cofoco:open-bag')) }}>{off ? 'Unavailable' : 'Add to cart'}</button>
      {off && <p className="muted">This kit is currently unavailable. Contents and price stay visible; see available kits below.</p>}
      <table><caption className="eyebrow" style={{ textAlign: 'left', padding: '16px 0' }}>What's in the kit · {kit.components.length} components · {items} items</caption>
        <thead><tr><th scope="col">Component</th><th scope="col">Material / size</th><th scope="col" style={{ textAlign: 'right' }}>Qty</th></tr></thead>
        <tbody>{kit.components.map(x => <tr key={x.name}><td>{x.name}</td><td className="muted">{x.spec ?? '—'}</td><td className="q num">× {x.qty}</td></tr>)}</tbody></table>
    </div></div>
    {off && <div className="wrap stack" style={{ marginTop: 64 }}><h2>Available now</h2><div className="grid">{alts.map(k => <KitCard key={k.slug} kit={k} />)}</div></div>}
  </section>)
}
