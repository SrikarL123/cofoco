import { Link } from 'react-router-dom'
import { inr } from '../data/mock'
import { useCart } from '../cart/CartContext'
import ShippingReturns from '../components/ShippingReturns'
export default function Cart() {
  const { lines, subtotal, setQty, remove } = useCart()
  if (!lines.length) return <section className="band"><div className="wrap stack"><h1 style={{ fontSize: 'clamp(36px,5vw,64px)' }}>Your cart is empty</h1><Link className="btn primary" to="/shop">Shop all kits</Link></div></section>
  return (<section className="band"><div className="wrap stack">
    <h1 style={{ fontSize: 'clamp(36px,5vw,64px)' }}>Cart</h1>
    {lines.map(({ kit, qty }) => (<div key={kit.slug} className="row" style={{ justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: 16 }}>
      <div><h3>{kit.name}</h3><p className="muted num">{inr(kit.price)} each</p></div>
      <div className="row" style={{ alignItems: 'center' }}>
        <button className="chip" aria-label={`Decrease ${kit.name}`} onClick={() => setQty(kit.slug, qty - 1)}>−</button><span className="num" aria-live="polite">{qty}</span>
        <button className="chip" aria-label={`Increase ${kit.name}`} onClick={() => setQty(kit.slug, qty + 1)}>+</button>
        <button className="chip" onClick={() => remove(kit.slug)}>Remove</button></div></div>))}
    <p className="num" style={{ fontSize: 24 }}>Subtotal {inr(subtotal)} <span className="muted" style={{ fontSize: 14 }}>before shipping and tax</span></p><ShippingReturns />
    <p className="muted">Demo checkout only. No payment is processed.</p><Link className="btn primary" to="/checkout">Continue to checkout</Link>
  </div></section>)
}
