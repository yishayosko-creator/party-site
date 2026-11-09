export default function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-24 -start-24 w-96 h-96 rounded-full bg-party-200/40 blur-3xl animate-float" />
      <div className="absolute top-1/3 -end-32 w-80 h-80 rounded-full bg-ocean-200/30 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 start-1/4 w-72 h-72 rounded-full bg-confetti-yellow/20 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
}
