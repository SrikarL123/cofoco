import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { characterRows, COST_COVERAGE, days, REFRESHED } from '../data/mockAnalytics'
import { inr } from '../data/mock'
import { readOrders } from '../lib/orders'
const pct = (n: number, d: number) => (d ? `${((n / d) * 100).toFixed(1)}%` : '—')
const tick = { fill: '#99958B', fontSize: 12 }
const tip = { background: '#111', border: '1px solid rgba(214,177,94,.38)', color: '#F4F0E7' }
function KPI({ label, value, den, def, badge }: { label: string; value: string; den: string; def: string; badge?: string }) {
  return <div className="metric"><span>{label}</span><strong className="num">{value}</strong><span className="small">{den}</span>{badge && <span className="pill">{badge}</span>}
    <details><summary>Definition</summary><p className="small muted">{def}</p></details></div>
}
export default function Founder() {
  const [range, setRange] = useState(14); const [table, setTable] = useState(false)
  const d = days.slice(-range); const sum = (f: (x: (typeof days)[number]) => number) => d.reduce((a, x) => a + f(x), 0)
  const sessions = sum(x => x.sessions), orders = sum(x => x.orders), net = sum(x => x.revenue - x.refunds)
  const viewed = characterRows.reduce((a, c) => a + c.viewed, 0), reached = characterRows.reduce((a, c) => a + c.reached, 0)
  const trend = d.map(x => ({ date: x.date, net: x.revenue - x.refunds }))
  const exportCsv = () => {
    const rows = ['date,sessions,orders,net_revenue_inr', ...d.map(x => [x.date, x.sessions, x.orders, x.revenue - x.refunds].join(','))]
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' })); a.download = 'cofoco-demo-aggregates.csv'; a.click()
  }
  return (<section className="band"><div className="wrap stack">
    <p className="eyebrow">Founder view · demo</p><h1 className="page-title">The numbers behind the practice.</h1>
    <div className="notice">Demo functionality: seeded sample figures, not real sales or tracking data. Aggregates exclude names, emails, phone numbers and addresses. Data covers 1–14 Nov 2026 · last refreshed {REFRESHED} (simulated).</div>
    <div className="row" role="group" aria-label="Date range">{[7, 14].map(n => <button key={n} className="chip" aria-pressed={range === n} onClick={() => setRange(n)}>Last {n} days</button>)}
      <button className="chip" onClick={exportCsv}>Export aggregates (demo CSV)</button></div>
    <div className="kpi-grid">
      <KPI label="Session conversion" value={pct(orders, sessions)} den={`${orders} ÷ ${sessions} sessions`} def="Eligible sessions with at least one captured order ÷ eligible sessions." />
      <KPI label="Character engagement" value={pct(reached, viewed)} den={`${reached} ÷ ${viewed} character views`} def="Sessions reaching a kit from a character page ÷ sessions viewing that character." />
      <KPI label="Net merchandise revenue" value={inr(net)} den="Excludes tax and shipping" def="Captured merchandise value after discounts, less merchandise refunds." />
      <KPI label="Contribution (demo estimate)" value={inr(Math.round(net * 0.34))} den="34% placeholder margin" badge={`Costs incomplete — ${COST_COVERAGE * 100}% coverage`} def="Net merchandise revenue + net shipping − product cost − fulfilment and shipping costs − payment fees." />
      <KPI label="Return rate" value={pct(sum(x => x.returned), sum(x => x.delivered))} den={`${sum(x => x.returned)} ÷ ${sum(x => x.delivered)} delivered units`} badge="Provisional" def="Returned units received ÷ delivered units for the same cohort; recent cohorts are provisional." />
      <KPI label="On-time dispatch" value={pct(sum(x => x.dispatched), sum(x => x.due))} den={`${sum(x => x.dispatched)} ÷ ${sum(x => x.due)} orders due`} def="Orders dispatched by the promised time ÷ orders due in the period." />
    </div>
    <div className="row between"><h2>Net revenue by day</h2><button className="chip" aria-pressed={table} onClick={() => setTable(v => !v)}>View as table</button></div>
    {table ? <div className="table-scroll" tabIndex={0} role="region" aria-label="Net revenue table"><table><caption className="small muted">Net merchandise revenue, demo data</caption><thead><tr><th scope="col">Day</th><th scope="col">Net revenue</th></tr></thead><tbody>{trend.map(t => <tr key={t.date}><th scope="row">{t.date}</th><td>{inr(t.net)}</td></tr>)}</tbody></table></div>
      : <div className="chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><CartesianGrid stroke="rgba(214,177,94,.12)" /><XAxis dataKey="date" tick={tick} /><YAxis tick={tick} tickFormatter={v => `${v / 1000}k`} width={44} /><Tooltip contentStyle={tip} formatter={v => inr(Number(v))} /><Line type="monotone" dataKey="net" stroke="#D6B15E" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>}
    <h2>Revenue by character</h2>
    <div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={characterRows} layout="vertical" margin={{ left: 16 }}><CartesianGrid stroke="rgba(214,177,94,.12)" horizontal={false} /><XAxis type="number" tick={tick} tickFormatter={v => `${v / 1000}k`} /><YAxis type="category" dataKey="name" tick={tick} width={72} /><Tooltip contentStyle={tip} formatter={v => inr(Number(v))} /><Bar dataKey="revenue" fill="#D6B15E" /></BarChart></ResponsiveContainer></div>
    <p className="muted small">Customer-created demo orders in this browser: {readOrders().length} (not included in the seeded figures). Reconciliation against a gateway needs a backend.</p>
  </div></section>)
}
