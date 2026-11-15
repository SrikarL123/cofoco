// DEMO DATA ONLY: simulated figures generated in code. Not real sales, customers or costs.
import { characters } from './mock'
export interface Row { day: string; character: string; sessions: number; views: number; reached: number; orders: number; units: number; gross: number; refunds: number; cost: number | null; delivered: number; returned: number; due: number; ontime: number }
const r = (i: number, j: number) => 0.5 + 0.5 * Math.sin(i * 12.9898 + j * 78.233)
export const rows: Row[] = []
for (let d = 0; d < 14; d++) {
  const day = new Date(Date.UTC(2026, 10, 2 + d)).toISOString().slice(0, 10)
  characters.forEach((c, j) => {
    const views = Math.round(60 + r(d, j) * 90), sessions = views + Math.round(40 + r(d + 3, j) * 60)
    const reached = Math.round(views * (0.28 + r(d, j + 5) * 0.2)), orders = Math.round(reached * (0.08 + r(d + 1, j) * 0.07))
    const units = orders + (r(d, j + 9) > 0.8 ? 1 : 0), gross = units * Math.round(2600 + j * 220)
    rows.push({ day, character: c.slug, sessions, views, reached, orders, units, gross, refunds: r(d + 7, j) > 0.85 ? Math.round(gross * 0.5) : 0,
      cost: c.slug === 'savitri' ? null : Math.round(gross * 0.52), delivered: Math.round(units * 0.8), returned: Math.round(units * 0.8 * 0.06), due: orders, ontime: Math.floor(orders * 0.93) })
  })
}
