import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { kits, type Kit } from '../data/mock'
interface Line { kit: Kit; qty: number }
interface Ctx { lines: Line[]; count: number; subtotal: number; add: (slug: string) => void; setQty: (slug: string, q: number) => void; remove: (slug: string) => void; clear: () => void }
const CartCtx = createContext<Ctx | null>(null)
export function CartProvider({ children }: { children: ReactNode }) {
  const [q, setQ] = useState<Record<string, number>>(() => { try { return JSON.parse(localStorage.getItem('cofoco-cart') || '{}') } catch { return {} } })
  useEffect(() => { localStorage.setItem('cofoco-cart', JSON.stringify(q)) }, [q])
  const lines = Object.entries(q).map(([s, qty]) => ({ kit: kits.find(k => k.slug === s)!, qty })).filter(l => l.kit && l.qty > 0)
  const add = (s: string) => setQ(p => ({ ...p, [s]: Math.min(9, (p[s] ?? 0) + 1) }))
  const setQty = (s: string, n: number) => setQ(p => ({ ...p, [s]: Math.max(0, Math.min(9, n)) }))
  const remove = (s: string) => setQ(p => { const r = { ...p }; delete r[s]; return r })
  const clear = () => setQ({})
  const count = lines.reduce((a, l) => a + l.qty, 0)
  const subtotal = lines.reduce((a, l) => a + l.qty * l.kit.price, 0)
  return <CartCtx.Provider value={{ lines, count, subtotal, add, setQty, remove, clear }}>{children}</CartCtx.Provider>
}
export const useCart = () => { const c = useContext(CartCtx); if (!c) throw new Error('CartProvider missing'); return c }
