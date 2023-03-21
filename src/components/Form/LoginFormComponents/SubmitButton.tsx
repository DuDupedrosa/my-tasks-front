import LoadingSpinner from '@/components/LoadingSpinner';
import React from 'react';

interface SubmitButtonProps {
  label: string;
  loading: boolean;
  loadingColor: string;
  loadingSize?: string;
}

const SubmitButton = ({
  label,
  loading,
  loadingColor,
  loadingSize,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`
      font-poppins
      text-lg
      text-white 
      tracking-wide 
      pt-2
      pb-2
      w-full 
      bg-violet-700 
      text-center 
      rounded-md 
      hover:bg-violet-900
      transition-all
      ${loading ? 'cursor-wait' : 'cursor-pointer'}
      `}
    >
      {loading && (
        <div className="grid place-items-center">
          <LoadingSpinner color={loadingColor} size={loadingSize} />
        </div>
      )}
      {!loading && label}
    </button>
  );
};

export default SubmitButton;
