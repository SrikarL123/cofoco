import { Link, NavLink, useParams } from 'react-router-dom'
import { characters, kits } from '../data/mock'
import KitCard from '../components/KitCard'
import NotFound from './NotFound'
export default function Character() {
  const { slug } = useParams(); const c = characters.find(x => x.slug === slug)
  if (!c) return <NotFound />
  const mine = kits.filter(k => k.character === c.slug); const avail = kits.filter(k => k.availability !== 'unavailable')
  return (<div data-character={c.slug}>
    <section className="hero"><div className="wrap stack">
      <p className="eyebrow">{c.name} by COFOCO</p><h1>{c.name}</h1><div className="rule" />
      <p className="row"><span className="pill">Quality: {c.quality}</span><span className="pill">Routine: {c.cue}</span></p>
      <p style={{ maxWidth: '46ch', fontSize: 19 }}>{c.story}</p>
      <a className="btn primary" href="#kits">View {c.name}'s kits</a>
    </div></section>
    <nav className="wrap chips" aria-label="Characters" style={{ padding: '16px 20px' }}>
      {characters.map(x => <NavLink key={x.slug} className="chip" to={`/characters/${x.slug}`} aria-current={x.slug === c.slug ? 'page' : undefined}>{x.name}</NavLink>)}</nav>
    <section className="band alt" id="kits"><div className="wrap stack">
      <h2>{c.name}'s kits</h2><div className="grid four">{mine.map(k => <KitCard key={k.slug} kit={k} />)}</div>
      {mine.some(k => k.availability === 'unavailable') && <><h3>Available now</h3><div className="grid four">{avail.filter(k => k.character !== c.slug).slice(0, 4).map(k => <KitCard key={k.slug} kit={k} />)}</div></>}
      <Link className="btn" to="/shop">Shop all kits</Link>
    </div></section>
  </div>)
}
