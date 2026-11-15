import { Link } from 'react-router-dom'
import Tilt from './Tilt'
import { charOf, inr, label, type Kit } from '../data/mock'
export default function KitCard({ kit }: { kit: Kit }) {
  const ch = charOf(kit.character)
  return (<Tilt><Link to={`/kits/${kit.slug}`} className="card" aria-label={`${ch.name} ${kit.name}`}>
    <div className="ph" role="img" aria-label={`Placeholder image for ${ch.name} ${kit.name}`}>Placeholder — {ch.name} {kit.name} 4:5</div>
    <div className="body stack">
      <p className="eyebrow">◇ {ch.name}</p><h3>{kit.name}</h3>
      <p className="muted">{kit.components.length} components</p>
      <p className="num"><strong>{inr(kit.price)}</strong>{kit.compareAt && <> <s className="muted">{inr(kit.compareAt)}</s> <span style={{ color: 'var(--gold)' }}>Save {inr(kit.compareAt - kit.price)}</span></>}</p>
      <span className="pill">{label[kit.availability]}</span>
    </div></Link></Tilt>)
}
