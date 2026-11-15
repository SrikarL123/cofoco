import { Link } from 'react-router-dom'
export default function ShippingReturns() {
  return <aside className="terms-box" aria-label="Shipping and returns"><strong>Shipping &amp; returns</strong>
    <p className="muted small">Delivery charges, dispatch time and return terms are not yet approved and will be shown in full before payment. Draft information: <Link className="text-link" to="/shipping">shipping</Link> · <Link className="text-link" to="/returns">returns</Link> · <Link className="text-link" to="/terms">terms</Link>.</p></aside>
}
