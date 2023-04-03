import { CircularProgress } from '@chakra-ui/react';
import React from 'react';

interface Props {
  color?: string;
  size?: string;
  sizeThickness?: string;
}

const LoadingCircularProgress = ({ color, size, sizeThickness }: Props) => {
  return (
    <div className="grid place-items-center mt-8">
      <CircularProgress
        isIndeterminate
        color={color ? color : '#4338ca'}
        size={size ? size : '100px'}
        thickness={sizeThickness ? sizeThickness : '4px'}
      />
    </div>
  );
};

export default LoadingCircularProgress;
