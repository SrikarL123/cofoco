import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { readOrders } from '../lib/orders'
import { inr } from '../data/mock'
const STEPS = ['Order received', 'Payment confirmed', 'Preparing your kit', 'Dispatched', 'Delivered']
const digits = (s: string) => s.replace(/\D/g, '')
const stamp = (iso: string, i: number) => new Date(new Date(iso).getTime() + i * 7 * 36e5).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
export default function Track() {
  const [sp] = useSearchParams(); const [id, setId] = useState(sp.get('order') ?? ''); const [contact, setContact] = useState('')
  const [errs, setErrs] = useState<{ id?: string; contact?: string }>({}); const [done, setDone] = useState(false); const [stage, setStage] = useState(0)
  const order = done ? readOrders().find(o => o.id.toLowerCase() === id.trim().toLowerCase()) : undefined
  const ok = !!order && (contact.trim().toLowerCase() === order.customer.email.toLowerCase() || (digits(contact).length >= 8 && digits(contact) === digits(order.customer.phone)))
  const submit = (e: FormEvent) => { e.preventDefault(); const n: typeof errs = {}
    if (!id.trim()) n.id = 'Enter the order reference, for example CF…'
    if (!contact.trim()) n.contact = 'Enter the email address or phone number used at checkout'
    setErrs(n); setDone(!n.id && !n.contact); setStage(0) }
  return <section className="band"><div className="wrap narrow stack"><p className="eyebrow">Order support · simulated</p><h1 className="page-title">Track an order</h1>
    <p className="muted">Demo tracking: orders are stored in this browser and no courier is connected. Enter the reference and the email or phone used when placing the demo order.</p>
    <form className="form stack" onSubmit={submit} noValidate>
      <label>Order reference<input value={id} onChange={e => { setId(e.target.value); setDone(false) }} aria-invalid={!!errs.id} aria-describedby={errs.id ? 'e-id' : undefined} autoComplete="off" /></label>{errs.id && <p id="e-id" role="alert" className="field-error">{errs.id}</p>}
      <label>Email or phone<input value={contact} onChange={e => { setContact(e.target.value); setDone(false) }} aria-invalid={!!errs.contact} aria-describedby={errs.contact ? 'e-c' : undefined} autoComplete="email" /></label>{errs.contact && <p id="e-c" role="alert" className="field-error">{errs.contact}</p>}
      <button className="btn primary" type="submit">Find order</button></form>
    {done && !ok && <p className="notice" role="status">We couldn't match that reference and contact. Check both, and use the browser where the demo order was placed.</p>}
    {done && ok && order && <div className="summary stack"><p className="eyebrow">Order {order.id}</p><h2>{STEPS[stage]}</h2>
      <p className="notice">Simulated tracking. Timestamps are demo values and no real courier is connected.</p>
      <label>Preview a demo state<select value={stage} onChange={e => setStage(Number(e.target.value))}>{STEPS.map((s, i) => <option key={s} value={i}>{s}</option>)}</select></label>
      <ol className="timeline" aria-label="Order progress (simulated)">{STEPS.map((s, i) => { const st = i < stage ? 'done' : i === stage ? 'current' : 'upcoming'
        return <li key={s} data-state={st} aria-current={st === 'current' ? 'step' : undefined}><strong>{s}</strong><p className="small muted">{st === 'done' ? 'Complete' : st === 'current' ? 'Current' : 'Upcoming'}{i <= stage ? ` · ${stamp(order.created, i)} (demo)` : ''}</p></li> })}</ol>
      {order.items.map(i => <p key={i.slug}>{i.name} × {i.qty}</p>)}<p className="num">Total {inr(order.total)}</p></div>}
  </div></section>
}
