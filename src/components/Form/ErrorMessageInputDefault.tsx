import { requiredInputErrorDefaultMessage } from '@/helper/messages';
import { requiredInputMessageStyles } from '@/styles/form/requiredInputMessage';
import React from 'react';
import { GoAlert } from 'react-icons/go';

interface Props {
  message?: string;
}

function ErrorMessageInputDefault({ message }: Props) {
  return (
    <span className={requiredInputMessageStyles}>
      <GoAlert className="text-red-500" />
      {message ? message : requiredInputErrorDefaultMessage}
    </span>
  );
}

export default ErrorMessageInputDefault;
