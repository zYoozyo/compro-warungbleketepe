import { useCallback, useEffect, useRef, useState } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#profile', label: 'Profile' },
  { href: '#contact', label: 'Contact' },
] as const

const SECTION_IDS = links.map((l) => l.href.slice(1)) as readonly string[]

function sectionIdFromHash(hash: string): string {
  const id = (hash.replace(/^#/, '') || 'home').trim()
  return SECTION_IDS.includes(id) ? id : 'home'
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const lastIdRef = useRef<string>('')
  const [open, setOpen] = useState(false)
  const [activeHash, setActiveHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash || '#home' : '#home',
  )

  const syncHashFromUrl = useCallback(() => {
    const raw = window.location.hash || '#home'
    const id = sectionIdFromHash(raw)
    const normalized = `#${id}`
    lastIdRef.current = id
    setActiveHash(normalized)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', syncHashFromUrl)
    return () => window.removeEventListener('hashchange', syncHashFromUrl)
  }, [syncHashFromUrl])

  const applyActiveFromScroll = useCallback(() => {
    const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 96
    const anchorY = headerBottom + 6

    const doc = document.documentElement
    const atBottom =
      Math.round(window.innerHeight + window.scrollY) >= doc.scrollHeight - 3

    let nextId: string = SECTION_IDS[0]

    if (atBottom) {
      nextId = SECTION_IDS[SECTION_IDS.length - 1]
    } else {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top } = el.getBoundingClientRect()
        if (top <= anchorY) nextId = id
      }
    }

    if (lastIdRef.current === nextId) return

    lastIdRef.current = nextId
    const hash = `#${nextId}`
    setActiveHash(hash)
    window.history.replaceState(null, '', hash)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        applyActiveFromScroll()
      })
    }

    applyActiveFromScroll()
    requestAnimationFrame(() => applyActiveFromScroll())

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [applyActiveFromScroll])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const setNavTarget = useCallback((href: string) => {
    const id = sectionIdFromHash(href)
    lastIdRef.current = id
    setActiveHash(`#${id}`)
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-[100] border-b border-wood/8 bg-cream-earth/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-3.5">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => {
            setOpen(false)
            setNavTarget('#home')
          }}
        >
          <img
            src="/site/img/logo.png"
            width={52}
            height={52}
            alt=""
            className="bg-ivory ring-meadow/20 h-[3.15rem] w-[3.15rem] shrink-0 rounded-xl object-cover ring-2 md:h-14 md:w-14 md:rounded-2xl"
            loading="eager"
            decoding="async"
          />
          <span className="font-display text-wood truncate text-[1.06rem] font-semibold md:text-xl">
            Warung Bleketepe
          </span>
        </a>

        <button
          type="button"
          className="text-wood border-wood/15 hover:bg-meadow/12 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav-wb"
          aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <nav className="text-wood hidden items-center gap-7 text-[14px] font-medium md:flex md:gap-9 md:text-[15px]" aria-label="Navigasi utama">
          {links.map(({ href, label }) => {
            const active = activeHash === href
            return (
              <a
                key={href}
                href={href}
                data-active={active ? 'true' : undefined}
                aria-current={active ? 'page' : undefined}
                className={`nav-link-rustic font-sans transition-colors hover:text-meadow ${active ? 'text-meadow font-semibold' : 'text-wood/80'}`}
                onClick={() => setNavTarget(href)}
              >
                {label}
              </a>
            )
          })}
        </nav>
      </div>

      <nav
        id="mobile-nav-wb"
        className={`border-wood/8 md:hidden ${open ? 'flex' : 'hidden'} flex-col gap-0.5 border-t bg-cream-earth/95 px-4 py-4 backdrop-blur-md`}
        aria-hidden={!open}
        aria-label="Navigasi utama (mobile)"
      >
        {links.map(({ href, label }) => {
          const active = activeHash === href
          return (
            <a
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-xl px-3 py-3 text-[15px] font-semibold tracking-wide transition-colors ${
                active ? 'bg-meadow/20 text-meadow' : 'text-wood hover:bg-meadow/14 hover:text-meadow'
              }`}
              onClick={() => {
                setOpen(false)
                setNavTarget(href)
              }}
            >
              {label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
