import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { characters, charOf, inr, kits, label } from '../data/mock'
const useMax = () => { const q = '(min-width:1024px)'; const [d, setD] = useState(() => matchMedia(q).matches)
  useEffect(() => { const m = matchMedia(q), f = () => setD(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, []); return d ? 3 : 2 }
export default function Compare() {
  const max = useMax(); const [sp, setSp] = useSearchParams(); const [diff, setDiff] = useState(false)
  const raw = sp.get('kits'); const ids = (raw === null ? ['arjun-prep', 'bheema-session'] : raw.split(',')).filter(s => kits.some(k => k.slug === s)).slice(0, max)
  const toggle = (id: string) => setSp({ kits: (ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]).join(',') }, { replace: true })
  const chosen = ids.map(i => kits.find(k => k.slug === i)!)
  const names = [...new Set(chosen.flatMap(k => k.components.map(c => c.name)))]
  const rows = names.map(n => ({ n, r: chosen.map(k => k.components.find(c => c.name === n)) })).map(x => ({ ...x, differs: new Set(x.r.map(c => (c ? `${c.qty}|${c.spec ?? ''}` : 'none'))).size > 1 }))
  const shown = rows.filter(x => !diff || x.differs)
  return <section className="band"><div className="wrap stack"><p className="eyebrow">Make an informed choice</p><h1 className="page-title">Compare kits</h1>
    <p className="muted">Select up to {max} kits. Your selection is saved in the page address, so you can share it.</p>
    <div className="pickgrid">{characters.map(c => <fieldset className="pickgrp" key={c.slug}><legend className="eyebrow">{c.name}</legend>
      {kits.filter(k => k.character === c.slug).map(k => <label className="pick" key={k.slug}><input type="checkbox" checked={ids.includes(k.slug)} disabled={!ids.includes(k.slug) && ids.length >= max} onChange={() => toggle(k.slug)} /><span>{k.name}</span></label>)}</fieldset>)}</div>
    <p className="muted small" aria-live="polite">{ids.length} of {max} kits selected{ids.length >= max ? ' (limit reached: clear one to swap)' : ''}</p>
    {chosen.length < 2 ? <p>Select at least two kits to compare.</p> : <>
      <label className="pick"><input type="checkbox" checked={diff} onChange={e => setDiff(e.target.checked)} /><span>Show differences only</span></label>
      <table className="ctable"><caption className="muted small">Comparison of {chosen.map(k => k.name).join(', ')}. {shown.length} of {rows.length} component rows shown.</caption>
        <thead><tr><td className="lab" /> {chosen.map(k => <th scope="col" key={k.slug}><span className="eyebrow">{charOf(k.character).name}</span><br />{k.name}</th>)}</tr></thead>
        <tbody>
          <tr><th scope="row" className="lab">Price</th>{chosen.map(k => <td className="num" key={k.slug}>{inr(k.price)}</td>)}</tr>
          <tr><th scope="row" className="lab">Availability</th>{chosen.map(k => <td key={k.slug}>{label[k.availability]}</td>)}</tr>
          <tr><th scope="row" className="lab">Components</th>{chosen.map(k => <td key={k.slug}>{k.components.length}</td>)}</tr>
          {shown.map(x => <tr key={x.n} className={x.differs ? 'diff' : ''}><th scope="row" className="lab">{x.n}{x.differs && <><br /><span className="tag">Differs</span></>}</th>
            {x.r.map((c, i) => <td key={i}>{c ? <>× {c.qty}{c.spec && <span className="muted small"><br />{c.spec}</span>}</> : <span className="muted">Not included</span>}</td>)}</tr>)}
          <tr><th scope="row" className="lab">Details</th>{chosen.map(k => <td key={k.slug}><Link className="text-link" to={`/kits/${k.slug}`}>View kit</Link></td>)}</tr>
        </tbody></table></>}
  </div></section>
}
