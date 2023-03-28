import React from 'react';
import { BiPlus } from 'react-icons/bi';

interface FirstTaskAlertProps {
  handleAddTask: () => void;
}

const FirstTaskAlert = ({ handleAddTask }: FirstTaskAlertProps) => {
  return (
    <div>
      <p className="font-poppins text-sm text-black font-medium  bg-yellow-400 rounded-lg pr-2 pl-2 pt-4 pb-4 max-w-max">
        Ops! Parece que você é novo por aqui ou não tem, nenhuma anotação salva,
        adicione sua primeira anotação, para visualizar o quadro de tarefas
      </p>
    </div>
  );
};

export default FirstTaskAlert;
