'use client';

interface LipsButtonProps {
  isGlowing: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export default function LipsButton({ isGlowing, onClick, buttonRef }: LipsButtonProps) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`w-32 h-32 rounded-full font-bold text-3xl transition-all duration-300 ${
        isGlowing
          ? 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-2xl shadow-pink-500/50 scale-110'
          : 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg'
      }`}
    >
      💋
    </button>
  );
}
