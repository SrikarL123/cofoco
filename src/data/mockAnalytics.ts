// DEMO DATA ONLY — seeded, deterministic figures for the founder dashboard. Not real sales or tracking data.
export const REFRESHED = '15 Nov 2026, 06:00 IST'
export const COST_COVERAGE = 0.82
export const days = Array.from({ length: 14 }, (_, i) => {
  const sessions = 420 + ((i * 37) % 90), orders = Math.round(sessions * (0.022 + (i % 4) * 0.004))
  return { date: `${String(i + 1).padStart(2, '0')} Nov`, sessions, orders, revenue: orders * 3150, refunds: i % 5 === 0 ? 3150 : 0,
    due: orders, dispatched: Math.max(0, orders - (i % 3)), delivered: i < 10 ? orders : 0, returned: i < 10 && i % 4 === 0 ? 1 : 0 }
})
export const characterRows = [
  { name: 'Arjun', viewed: 980, reached: 410, orders: 31, revenue: 99200 }, { name: 'Bheema', viewed: 760, reached: 270, orders: 22, revenue: 87800 },
  { name: 'Karna', viewed: 540, reached: 180, orders: 14, revenue: 41900 }, { name: 'Sita', viewed: 890, reached: 360, orders: 28, revenue: 98000 },
  { name: 'Draupadi', viewed: 610, reached: 205, orders: 15, revenue: 57000 }, { name: 'Savitri', viewed: 470, reached: 170, orders: 12, revenue: 32400 },
]
