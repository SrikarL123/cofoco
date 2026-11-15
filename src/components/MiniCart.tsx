import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { inr } from '../data/mock'
import { useCart } from '../cart/CartContext'
export default function MiniCart({ close }: { close: () => void }) {
 const ref = useRef<HTMLElement>(null); useEffect(() => { ref.current?.focus() }, [])
 const { lines, subtotal, count, setQty, remove } = useCart()
 return <aside ref={ref} tabIndex={-1} id="mini-cart" className="mini-cart" aria-label="Mini cart"><div className="row between"><h3>Your bag ({count})</h3><button className="chip" onClick={close}>Close</button></div>
 {lines.length === 0 ? <p className="muted">Your bag is empty.</p> : <>{lines.map(({kit,qty})=><div className="mini-line" key={kit.slug}><div><strong>{kit.name}</strong><p className="muted">{inr(kit.price)}</p><div className="row"><button className="chip" onClick={()=>setQty(kit.slug,qty-1)} aria-label="Decrease quantity">−</button><span>{qty}</span><button className="chip" onClick={()=>setQty(kit.slug,qty+1)} aria-label="Increase quantity">+</button><button className="chip" onClick={()=>remove(kit.slug)}>Remove</button></div></div></div>)}<p className="num">Subtotal <strong>{inr(subtotal)}</strong></p><Link onClick={close} className="btn primary full" to="/cart">View bag</Link><Link onClick={close} className="text-link" to="/checkout">Checkout</Link></>}
 </aside>
}
