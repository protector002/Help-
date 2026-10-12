import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-950 text-emerald-100 border-emerald-700/60'
              : toast.type === 'error'
              ? 'bg-red-950 text-red-100 border-red-700/60'
              : 'bg-slate-900 text-slate-100 border-slate-700/60'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 font-medium leading-snug">{toast.message}</div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/60 hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
