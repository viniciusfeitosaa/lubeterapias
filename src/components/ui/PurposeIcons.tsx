type PurposeIconProps = {
  className?: string;
};

/** Missão — semente / crescimento */
export function MissionIcon({ className = "h-5 w-5" }: PurposeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12 21v-7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 13.5c-3.2-1.2-5.2-3.6-5.8-6.6-.2-1.1.6-2.1 1.7-2.1 2.8.1 5 2.2 5.5 4.7.5-2.5 2.7-4.6 5.5-4.7 1.1 0 1.9 1 1.7 2.1-.6 3-2.6 5.4-5.8 6.6"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M9.5 21h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Visão — horizonte / referência */
export function VisionIcon({ className = "h-5 w-5" }: PurposeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle
        cx="12"
        cy="9"
        r="3.2"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M4 16.5c2.2-2.4 5-3.7 8-3.7s5.8 1.3 8 3.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M3.5 19.5h17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Valores — peça de puzzle (marca / inclusão) */
export function ValuesIcon({ className = "h-5 w-5" }: PurposeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M9.2 4.2c.9 0 1.6.7 1.6 1.6V7h2.4c.9 0 1.6-.7 1.6-1.6 0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6V7H20c.6 0 1 .4 1 1v2.2c0 .9-.7 1.6-1.6 1.6-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.9 0 1.6.7 1.6 1.6V18c0 .6-.4 1-1 1h-2.2c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6H10.8c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6H5.5c-.6 0-1-.4-1-1v-2.2c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6C3.6 12.8 3 12.1 3 11.2V9c0-.6.4-1 1-1h2.2V5.8c0-.9.7-1.6 1.6-1.6.4 0 .8.2 1.1.4.3-.2.7-.4 1.3-.4Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}
