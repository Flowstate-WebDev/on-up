import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean } | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    setToast({ message, type, visible: true });
    
    timeoutRef.current = window.setTimeout(() => {
      setToast((prev) => prev ? { ...prev, visible: false } : null);
       setTimeout(() => setToast(null), 300); // 3 sekundy
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div 
          className={`fixed bottom-4 right-4 z-50 transition-all duration-300 transform ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
        >
          <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 text-white font-medium
            ${toast.type === 'success' ? 'bg-primary' : 
              toast.type === 'error' ? 'bg-error' : 'bg-info'
            }`}
          >
           {toast.type === 'success' && (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
           )}
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
