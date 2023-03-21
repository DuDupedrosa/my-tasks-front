import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoadingSpinnerProps {
  color: string;
  size?: string;
}

const LoadingSpinner = ({ size, color }: LoadingSpinnerProps) => {
  return (
    <div>
      <AiOutlineLoading3Quarters
        color={color}
        size={size ? size : '24'}
        className="animate-spin"
      />
    </div>
  );
};

export default LoadingSpinner;
