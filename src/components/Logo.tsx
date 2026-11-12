export function Logo({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
      <path
        d="M68 24C48.1177 24 32 40.1177 32 60C32 79.8823 48.1177 96 68 96C75.5 96 82.4 93.7 88 89.8C76.5 87.5 68 77.3 68 65C68 51.2 79.2 40 93 40C94.4 40 95.7 40.1 97 40.3C90.6 30.5 80.1 24 68 24Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M84 22L86 28L92 30L86 32L84 38L82 32L76 30L82 28L84 22Z" fill="currentColor" />
    </svg>
  )
}

export const TABS = ['Лазер', 'Плазма', 'Хиджама'] as const
