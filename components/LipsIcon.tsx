export default function LipsIcon({ size = 24, ...props }: { size?: number; [key: string]: any }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Labios estilizados */}
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.3" />
      <path d="M8 13c0 1.1 1.12 2 2.5 2H9c1.38 0 2.5-.9 2.5-2s-1.12-2-2.5-2-2.5.9-2.5 2z" fill="currentColor" />
      <path d="M15 13c0 1.1 1.12 2 2.5 2s2.5-.9 2.5-2-1.12-2-2.5-2-2.5.9-2.5 2z" fill="currentColor" />
    </svg>
  );
}
