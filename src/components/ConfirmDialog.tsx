import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-float p-6 sm:p-7 animate-slide-up">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 end-4 w-9 h-9 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center transition"
          aria-label="סגירה"
        >
          <X className="w-4 h-4 text-ink/60" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 id="confirm-dialog-title" className="font-display font-800 text-xl text-ink mb-2">{title}</h3>
        <p className="text-sm text-ink/60 font-500 leading-relaxed mb-6">{message}</p>

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border-2 border-cream-300 text-ink font-700 hover:bg-cream-50 transition"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl bg-party-600 hover:bg-party-700 text-white font-700 transition shadow-md"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
