/** Dekoratif daun tipis seperti contoh motif alami di sudut blok */
export function DecorRice({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 132c28-52 72-112 106-132M18 134c38-62 74-118 104-138M42 138c42-74 76-134 106-154"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="36" rx="26" ry="9" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.2" transform="rotate(-28 22 36)" />
      <ellipse cx="78" cy="78" rx="30" ry="10" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" transform="rotate(18 78 78)" />
    </svg>
  )
}
