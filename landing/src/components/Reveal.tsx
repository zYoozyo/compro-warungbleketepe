import { type ReactNode, useEffect, useRef, useState } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delayMs?: number
}

/** Fade + slight lift when entering viewport. Intersection Observer; resets motion for reduced-motion users. */
export function Reveal({ children, className = '', delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '0px 0px -7% 0px', threshold: 0.08 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-[opacity,transform] duration-700 ease-out motion-reduce:duration-150 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`.trim()}
      style={{ transitionDelay: visible && delayMs ? `${delayMs}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
