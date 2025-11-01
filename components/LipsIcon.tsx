export default function LipsIcon({ 
  size = 24, 
  className = ''
}: { 
  size?: number
  className?: string
}) {
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
      className={className}
    >
      {/* Labios minimalistas profesionales */}
      <path d="M7 13.5c0 1.5 2 2.5 5 2.5s5-1 5-2.5" />
      <path d="M12 13v3" />
    </svg>
  );
}
