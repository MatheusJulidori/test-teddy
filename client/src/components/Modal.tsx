import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';
import { Button } from '@/components/ui/button';

interface ModalProps {
  title: string;
  children: ReactNode;
  buttonLabel?: string;
  onSubmit?: () => void;
  onClose: () => void;
  showFooter?: boolean;
  isDestructive?: boolean;
}

export function Modal({ title, children, buttonLabel, onSubmit, onClose, showFooter = false }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-background p-6 rounded-xl shadow-xl min-w-[300px] max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-xl cursor-pointer"><MdClose /></button>
        </div>
        <div className="space-y-4">{children}</div>
        {showFooter && buttonLabel && onSubmit && (
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={onSubmit}
              className='flex-1 px-4 py-2 bg-primary text-white rounded-md cursor-pointer transition'
            >
              {buttonLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
