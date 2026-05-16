import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Header } from './components/Header'
import { Reveal } from './components/Reveal'
import { DecorRice } from './components/DecorRice'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'

type MenuCat = {
  key: string
  title: string
  teaser: string
  src: string
  alt: string
}

/** Berkas brosur: warung-bleketepe/assets/menus/menu1.png … menu6.png */
const MENU_CATEGORIES: MenuCat[] = [
  {
    key: 'menu1',
    title: 'Menu Kopi',
    teaser: 'Kopi hangat & racikan santai seperti sore di tepi sawah.',
    src: '/site/menus/menu1.png',
    alt: 'Brosur menu kopi Warung Bleketepe',
  },
  {
    key: 'menu2',
    title: 'Aneka Makanan',
    teaser: 'Hidangan rumahan lengkap, cocok makan rame bareng keluarga.',
    src: '/site/menus/menu2.png',
    alt: 'Brosur aneka makanan Warung Bleketepe',
  },
  {
    key: 'menu3',
    title: 'Minuman',
    teaser: 'Segar menemani udara desa yang lembap dan adem.',
    src: '/site/menus/menu3.png',
    alt: 'Brosur minuman Warung Bleketepe',
  },
  {
    key: 'menu4',
    title: 'Aneka Jajanan',
    teaser: 'Camilan kecil yang pas menemani obrolan panjang.',
    src: '/site/menus/menu4.png',
    alt: 'Brosur aneka jajanan Warung Bleketepe',
  },
  {
    key: 'menu5',
    title: 'Warmindo',
    teaser: 'Makanan hangat praktis saat perut sudah keroncongan.',
    src: '/site/menus/menu5.png',
    alt: 'Brosur warmindo Warung Bleketepe',
  },
  {
    key: 'menu6',
    title: 'Menu dan promo',
    teaser: 'Informasi tambahan dan pilihan lain dari warung.',
    src: '/site/menus/menu6.png',
    alt: 'Brosur menu lainnya Warung Bleketepe',
  },
]

const PROFILE_HIGHLIGHTS = [
  'Suasana persawahan & ruang terbuka yang adem',
  'Tempat santai sore, nongkrong tanpa terburu-buru',
  'Menu lengkap untuk keluarga & teman',
  'Kopi pilihan buat temani hening desa',
  'Buka sampai malam, makan besar atau ngopi malam tetap bisa',
]

/** Embed pratinjau (taut utama navigasi pakai Maps app / browser): */
const MAP_SHARE_URL = 'https://maps.app.goo.gl/BGXDkKEngbvzWwWr8'

const MAP_EMBED_SRC =
  `https://maps.google.com/maps?q=${encodeURIComponent('Warung Bleketepe Ciwarak Sumbang Banyumas')}&z=17&output=embed`

/** Taruh berkas di: warung-bleketepe/assets/pdf/menu-lengkap.pdf */
const MENU_LENGKAP_PDF = '/site/pdf/MENU BLEKETEPE NEW.pdf'

export default function App() {
  const [menuIndex, setMenuIndex] = useState(0)
  const menuCarouselRef = useRef<HTMLDivElement>(null)
  const menuInstructionsId = useId()
  const touchStartX = useRef<number | null>(null)

  const goMenu = useCallback((delta: number) => {
    setMenuIndex((i) => (i + delta + MENU_CATEGORIES.length) % MENU_CATEGORIES.length)
  }, [])

  const slide = MENU_CATEGORIES[menuIndex]

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      goMenu(diff > 0 ? 1 : -1)
    }
    touchStartX.current = null
  }, [goMenu])

  useEffect(() => {
    const el = menuCarouselRef.current
    if (!el) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement)) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setMenuIndex((i) => (i - 1 + MENU_CATEGORIES.length) % MENU_CATEGORIES.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setMenuIndex((i) => (i + 1) % MENU_CATEGORIES.length)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <a
        href="#home"
        className="bg-meadow focus:ring-wood sr-only rounded-lg px-3 py-2 font-semibold text-ivory transition focus:not-sr-only focus:absolute focus:left-4 focus:top-[5.25rem] focus:z-[110] focus:inline-block focus:shadow-md focus:ring-2"
      >
        Lewati ke beranda
      </a>

      <FloatingWhatsApp />

      <div className="bg-cream-earth relative min-h-svh overflow-x-hidden">
        <main>
          <Header />
          <section
            id="home"
            className="relative flex min-h-svh flex-col scroll-mt-0 pt-[4.5rem] md:scroll-mt-0 md:pt-[5.25rem]"
            aria-labelledby="hero-title"
          >
            <div className="pointer-events-none absolute inset-0 z-0">
              <img
                src="/site/img/profile1.jpg"
                alt=""
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full min-h-svh w-full object-cover object-[center_45%]"
              />
              <div className="absolute inset-0 bg-wood/58" aria-hidden />
              <div className="from-meadow/28 absolute inset-0 bg-gradient-to-b to-wood/45" aria-hidden />
            </div>

            <DecorRice className="text-ivory pointer-events-none absolute -right-4 top-[22%] z-[1] h-48 w-auto opacity-[0.18] md:right-10 md:h-64" />

            <div className="relative z-[2] mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-16 pt-4 text-center sm:px-7 md:px-10 lg:pb-24">
              <Reveal>
                <p className="text-wheat/95 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/90">
                  Warung makan tepi kampung • Ciwarak, Banyumas
                </p>
                <h1
                  id="hero-title"
                  className="font-display mt-5 text-[2rem] font-semibold leading-[1.18] tracking-tight text-ivory sm:text-[2.65rem] md:text-[3.4rem]"
                >
                  Warung Bleketepe Tempat Makan Santai dengan Suasana Persawahan
                </h1>
              </Reveal>

              <Reveal className="mt-7 max-w-xl" delayMs={70}>
                <p className="font-sans text-[15px] leading-[1.75] text-white/92 sm:text-[17px] sm:leading-8 md:text-[18px]">
                  Nikmati hidangan lezat, kopi hangat, dan suasana pedesaan yang menenangkan.
                </p>
              </Reveal>

              <Reveal className="mt-11 flex w-full max-w-md flex-col gap-4 sm:max-w-lg sm:flex-row sm:justify-center" delayMs={140}>
                <a
                  href="#menu"
                  className="bg-meadow hover:bg-meadow/90 inline-flex min-h-[3.1rem] items-center justify-center rounded-2xl px-10 text-[15px] font-bold text-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 active:translate-y-0"
                >
                  Lihat Menu
                </a>
                <a
                  href="#profile"
                  className="border-ivory/40 bg-ivory/12 hover:bg-ivory/22 active:bg-ivory/16 inline-flex min-h-[3.1rem] items-center justify-center rounded-2xl border px-10 text-[15px] font-bold text-ivory backdrop-blur-[3px] transition-[background-color,border-color,transform] hover:-translate-y-0.5"
                >
                  Tentang Kami
                </a>
              </Reveal>
            </div>
          </section>

          <div className="bg-woodgrain border-wood/8 border-y">
            <section id="menu" className="scroll-mt-[4.75rem]" aria-labelledby="menu-section-title">
              <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
                <Reveal>
                  <div className="relative mx-auto max-w-3xl text-center lg:max-w-4xl">
                    <DecorRice className="text-meadow pointer-events-none absolute -left-6 -top-10 h-32 w-auto opacity-[0.2] md:-left-10" />
                    <p className="text-meadow font-sans text-[11px] font-bold uppercase tracking-[0.22em]">Menu warung</p>
                    <h2 id="menu-section-title" className="font-display text-wheat mt-3 text-[1.95rem] font-semibold md:text-[2.35rem]">
                      Penawaran kami
                    </h2>
                    <p className="text-wood/76 mx-auto mt-3 max-w-2xl font-sans text-[15px] leading-relaxed md:text-[16px]">
                      Geser brosur pakai panah atau titik di bawah. Di keyboard pakai tombol panah ketika kotak showcase aktif dipilih.
                    </p>
                  </div>
                </Reveal>

                <Reveal className="mx-auto mt-10 max-w-5xl 2xl:max-w-[70rem]" delayMs={40}>
                  <div
                    ref={menuCarouselRef}
                    tabIndex={0}
                    className="rounded-none outline-none focus-visible:ring-meadow/40 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Brosur menu Warung Bleketepe"
                    aria-describedby={menuInstructionsId}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <p id={menuInstructionsId} className="sr-only">
                      Gunakan panah kiri dan kanan, atau tombol lingkaran di bawah brosur untuk memilih kategori menu.
                    </p>

                    <div className="flex min-h-[min(72svh,520px)] items-center gap-3 sm:min-h-[min(76svh,600px)] sm:gap-4 md:min-h-[min(80svh,760px)]">
                      <button
                        type="button"
                        className="focus-visible:ring-meadow shrink-0 self-center rounded-full border border-wood/20 bg-ivory/80 p-2.5 text-[2rem] leading-none text-wood shadow-[0_2px_8px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-ivory hover:shadow-[0_4px_14px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:p-3 sm:text-[2.5rem] md:p-3.5 md:text-[3rem]"
                        aria-label="Brosur sebelumnya"
                        onClick={() => goMenu(-1)}
                      >
                        ‹
                      </button>

                      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-5">
                        <div className="flex min-h-[min(64svh,460px)] min-w-0 flex-1 items-center justify-center px-0 sm:min-h-[min(68svh,540px)] md:min-h-[min(72svh,700px)]">
                          <img
                            key={slide.src}
                            src={slide.src}
                            alt={slide.alt}
                            className="pointer-events-none max-h-[min(74svh,880px)] w-full max-w-full select-none object-contain drop-shadow-[0_4px_24px_rgba(61,49,34,0.08)] md:max-h-[min(78svh,920px)]"
                            loading={menuIndex === 0 ? 'eager' : 'lazy'}
                            draggable={false}
                          />
                        </div>

                        <div
                          className="flex flex-wrap items-center justify-center gap-2 px-2 sm:gap-3"
                          role="group"
                          aria-label="Pilih kategori brosur"
                        >
                          {MENU_CATEGORIES.map((cat, i) => (
                            <button
                              key={cat.key}
                              type="button"
                              aria-label={`${cat.title}, slide ${i + 1}`}
                              aria-pressed={menuIndex === i}
                              className={`h-2.5 w-2.5 rounded-full border transition-colors sm:h-[11px] sm:w-[11px] ${
                                menuIndex === i
                                  ? 'border-meadow bg-meadow scale-125'
                                  : 'border-wood/25 bg-wood/10 hover:bg-wood/20'
                              }`}
                              onClick={() => setMenuIndex(i)}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="focus-visible:ring-meadow shrink-0 self-center rounded-full border border-wood/20 bg-ivory/80 p-2.5 text-[2rem] leading-none text-wood shadow-[0_2px_8px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-ivory hover:shadow-[0_4px_14px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:p-3 sm:text-[2.5rem] md:p-3.5 md:text-[3rem]"
                        aria-label="Brosur berikutnya"
                        onClick={() => goMenu(1)}
                      >
                        ›
                      </button>
                    </div>

                    <div className="mx-auto mt-10 max-w-2xl px-2 text-center">
                      <h3 className="font-display text-wood text-xl font-semibold md:text-2xl">{slide.title}</h3>
                      <p className="text-wood/74 mt-2 font-sans text-[14px] leading-relaxed md:text-[15px]">{slide.teaser}</p>
                      <p className="text-wood/50 mt-3 font-mono text-[13px] tabular-nums" aria-live="polite" aria-atomic="true">
                        {menuIndex + 1}/{MENU_CATEGORIES.length}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal className="mt-12 md:mt-14">
                  <div className="flex flex-col items-center justify-center pt-2">
                    <a
                      href={MENU_LENGKAP_PDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-wood hover:text-meadow text-[15px] font-medium underline decoration-wood/25 underline-offset-[6px] transition-colors"
                    >
                      Buka menu lengkap (PDF)
                    </a>
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="profile" className="scroll-mt-[4.75rem] border-t border-wood/8 bg-ivory/65" aria-labelledby="profile-title">
              <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-16 md:px-8 md:py-16">
                <Reveal>
                  <div className="relative">
                    <p className="text-meadow font-sans text-[11px] font-bold uppercase tracking-[0.2em]">Kenali kami</p>
                    <h2 id="profile-title" className="font-display text-wood mt-2 text-[1.9rem] font-semibold md:text-[2.3rem]">
                      Warung untuk makan sambil menatap sawah, bukan tempat pamer teknologi.
                    </h2>
                    <p className="text-wood/83 mt-5 font-sans text-[15px] leading-[1.8] md:text-[17px]">
                      Warung Bleketepe adalah tempat makan lokal dengan menu lengkap, harga terjangkau, suasana nyaman, cocok untuk keluarga,
                      nongkrong, dan menikmati pemandangan alam di sekitar persawahan Ciwarak. Kami memilih layout sederhana: ruang lega, angin
                      sore lewat, dan suara alam yang mengiringi suapan pertama Anda.
                    </p>
                    <ul className="text-wood mt-8 space-y-3.5 font-sans text-[15px] leading-snug md:text-[16px]">
                      {PROFILE_HIGHLIGHTS.map((line) => (
                        <li key={line} className="flex gap-3">
                          <span className="bg-meadow/18 text-meadow mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold">
                            ✓
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal className="flex flex-col gap-5" delayMs={80}>
                  <div className="border-wood/12 overflow-hidden rounded-2xl border bg-cream-earth shadow-[0_4px_14px_rgba(107,79,58,0.08)]">
                    <img
                      src="/site/img/Bleketepe.png"
                      alt="Suasana duduk santai di area warung Warung Bleketepe"
                      className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
                      loading="lazy"
                    />
                    <p className="text-wood/75 border-wood/8 border-t px-5 py-4 font-sans text-[14px] leading-relaxed">
                      Meja kayu, langit terbuka, dan obrolan yang tidak terburu waktu seperti di halaman tetangga.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-meadow/22 bg-meadow/10 px-6 py-5">
                    <p className="font-display text-wood text-[1.1rem] font-semibold">Healing sederhana</p>
                    <p className="text-wood/78 mt-2 font-sans text-[14px] leading-relaxed">
                      Datang seorang diri atau bersama orang terdekat. Duduk lama, angin sore lewat, tanpa tuntutan suasana kota yang harus sempurna seperti di foto promosi besar.
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>

            <section id="contact" className="scroll-mt-[4.75rem] pb-16 pt-4 md:pb-20 md:pt-6" aria-labelledby="contact-title">
              <div className="mx-auto max-w-6xl px-4 md:px-8">
                <Reveal>
                  <p className="text-meadow font-sans text-[11px] font-bold uppercase tracking-[0.2em]">Kunjungi kami, tanpa formulir kota</p>
                  <h2 id="contact-title" className="font-display text-wood mt-2 text-[1.95rem] font-semibold md:text-[2.35rem]">
                    Alamat lengkap dan peta jalan sampai tepi kampung Bleketepe.
                  </h2>
                </Reveal>

                <div className="mt-11 grid gap-10 lg:grid-cols-[1fr_minmax(0,1.08fr)] lg:gap-12">
                  <Reveal>
                    <div className="space-y-8">
                      <address className="border-wood/12 rounded-2xl border bg-ivory p-6 shadow-[0_4px_14px_rgba(107,79,58,0.06)] not-italic md:p-7">
                        <h3 className="font-display text-wood mb-4 text-xl font-semibold">Alamat</h3>
                        <p className="font-sans text-[15px] leading-[1.74] md:text-[16px]">
                          Jl. Raya Karanggintung No.1,
                          <br />
                          Ciwarak, Karanggintung,
                          <br />
                          Kec. Sumbang, Kab. Banyumas,
                          <br />
                          Jawa Tengah <span className="whitespace-nowrap">53183</span>
                        </p>
                      </address>

                      <div className="border-wood/12 rounded-2xl border bg-ivory p-6 shadow-[0_4px_14px_rgba(107,79,58,0.06)] md:p-7">
                        <h3 className="font-display text-wood mb-4 text-xl font-semibold">WhatsApp reservasi</h3>
                        <p className="text-wood/76 font-sans text-[14px] leading-relaxed">
                          Chat santai juga boleh sekadar tanya paket besar atau kedatangan banyak orang sekalian.
                        </p>
                        <a
                          href="https://wa.me/6282264557876"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-meadow hover:bg-meadow/90 mt-4 inline-flex min-h-[2.95rem] items-center justify-center rounded-xl px-6 text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(107,142,35,0.35)] transition-[transform,background-color] hover:-translate-y-0.5"
                        >
                          Buka WhatsApp
                        </a>
                      </div>

                      <div className="border-meadow/25 rounded-2xl border border-l-4 border-l-meadow bg-cream-earth p-6 md:p-7">
                        <h3 className="font-display text-wood mb-3 text-xl font-semibold">Jam buka</h3>
                        <ul className="text-wood/88 space-y-2 font-sans text-[14px] leading-relaxed md:text-[15px]">
                          <li className="flex justify-between gap-4">
                            <span className="font-medium">Sabtu</span>
                            <span className="text-meadow font-bold tabular-nums">10.00 – 00.00</span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="font-medium">Minggu</span>
                            <span className="text-meadow font-bold tabular-nums">10.00 – 23.00</span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="font-medium">Senin</span>
                            <span className="text-meadow font-bold tabular-nums">10.00 – 23.00</span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="font-medium">Selasa</span>
                            <span className="text-meadow font-bold tabular-nums">10.00 – 23.00</span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="font-medium">Rabu</span>
                            <span className="text-meadow font-bold tabular-nums">10.00 – 23.00</span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="font-medium">Kamis</span>
                            <span className="text-meadow font-bold tabular-nums">10.00 – 23.00</span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="font-medium">Jumat</span>
                            <span className="text-meadow font-bold tabular-nums">13.00 – 23.00</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delayMs={60}>
                    <div>
                      <iframe
                        title="Peta lokasi Warung Bleketepe Ciwarak Banyumas"
                        src={MAP_EMBED_SRC}
                        className="aspect-[16/11] min-h-[240px] w-full rounded-2xl border-0 md:min-h-[320px]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                      <div className="mt-5 text-center">
                        <a
                          href={MAP_SHARE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-meadow hover:text-meadow/85 inline-flex text-[14px] font-semibold underline decoration-meadow/35 underline-offset-4 transition-colors"
                        >
                          Buka di Google Maps
                        </a>
                      </div>
                      <p className="text-wood/65 mx-auto mt-4 max-w-md text-center font-sans text-[13px] leading-snug md:text-[14px]">
                        Jalur akses bisa mengikuti narasi lokal atau jaringan jalur utama ke Ciwarak, Banyumas.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="border-wood/15 bg-wood text-cream-earth border-t pb-12 pt-10">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_auto] md:items-end md:gap-14 md:px-8">
            <div className="max-w-md">
              <p className="font-display text-lg font-semibold text-ivory">Warung Bleketepe</p>
              <p className="mt-4 font-sans text-[14px] leading-relaxed text-cream-earth/82">
                Makan santai menghadap suasana kampung Jawa Tengah. Terima kasih sudah menghargai suasana santai serta kepercayaan warga atas porsi serta harga jujur.
              </p>
            </div>
            <p className="font-sans text-[13px] text-cream-earth/68 md:text-right">
              © {new Date().getFullYear()} Warung Bleketepe • Dapur desa, bukan cetakan template kota besar.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
