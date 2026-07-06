import React from 'react';

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-[#0E1116]/50 backdrop-blur-[2px] px-4 font-body'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Modal Content */}
      <div className='relative flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md max-h-[90vh]'>

        {/* Modal Header */}
        {!hideHeader && (
          <div className='flex items-center justify-between p-4 border-b border-[#0E1116]/[0.06]'>
            <h3 className='font-display text-lg font-semibold text-[#0E1116]'>
              {title}
            </h3>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3.5 right-3.5 text-[#0E1116]/40 bg-transparent hover:bg-[#34D399]/10 hover:text-[#0E1116] rounded-lg text-sm w-8 h-8 flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]'
          type='button'
        >
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1l12 12M13 1L1 13'
            />
          </svg>
        </button>

        {/* Modal Body */}
        <div className='flex-1 overflow-y-auto cursor-scrollbar'>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;