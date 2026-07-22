type PurposeIconProps = {
  className?: string;
};

export function MissionIcon({ className = "h-5 w-5" }: PurposeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12 21s-6.5-4.35-9-8.2C1.3 10.2 2.1 6.8 5 5.6c1.7-.7 3.6-.2 4.8 1.1L12 9l2.2-2.3c1.2-1.3 3.1-1.8 4.8-1.1 2.9 1.2 3.7 4.6 2 7.2C18.5 16.65 12 21 12 21Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}

export function VisionIcon({ className = "h-5 w-5" }: PurposeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function ValuesIcon({ className = "h-5 w-5" }: PurposeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12 2.8 14.2 8l5.5.5-4.2 3.7 1.3 5.3L12 14.8 7.2 17.5l1.3-5.3L4.3 8.5 9.8 8 12 2.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
