import { useSearchParams } from 'react-router-dom'
import { characters, kits } from '../data/mock'
import KitCard from '../components/KitCard'
export default function Shop() {
  const [sp, setSp] = useSearchParams(); const ch = sp.get('character')
  const list = kits.filter(k => !ch || k.character === ch)
  return (<section className="band"><div className="wrap stack">
    <p className="eyebrow">Shop</p><h1 style={{ fontSize: 'clamp(36px,6vw,64px)' }}>All kits</h1>
    <div className="chips" role="group" aria-label="Filter by character">
      <button className="chip" aria-pressed={!ch} onClick={() => setSp({})}>All</button>
      {characters.map(c => <button key={c.slug} className="chip" aria-pressed={ch === c.slug} onClick={() => setSp({ character: c.slug })}>{c.name}</button>)}</div>
    <p className="muted" aria-live="polite">{list.length} kits</p>
    <div className="grid four">{list.map(k => <KitCard key={k.slug} kit={k} />)}</div>
  </div></section>)
}
