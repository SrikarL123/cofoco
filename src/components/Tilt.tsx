import { useRef, type PointerEvent, type ReactNode } from 'react'
export default function Tilt({ children }: { children: ReactNode }) {
  const r = useRef<HTMLDivElement>(null)
  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = r.current!, b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5
    el.style.setProperty('--rx', `${-y * 6}deg`); el.style.setProperty('--ry', `${x * 8}deg`)
  }
  const leave = () => { r.current?.style.setProperty('--rx', '0deg'); r.current?.style.setProperty('--ry', '0deg') }
  return <div className="tilt" ref={r} onPointerMove={move} onPointerLeave={leave}>{children}</div>
}
