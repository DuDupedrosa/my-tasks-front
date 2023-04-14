import React from 'react';
import { FaRegHandPointRight } from 'react-icons/fa';

interface AlertProps {
  step: string;
  handleAddTask: () => void;
}

const AlertNotTask = ({ step, handleAddTask }: AlertProps) => {
  return (
    <div>
      <p className="font-poppins text-sm text-black font-medium  bg-yellow-400 rounded-lg pr-2 pl-2 pt-4 pb-4 max-w-max">
        Ops! parece que você não tem nenhuma tarefa{' '}
        <span className="font-bold">{step}</span>, adicione uma tarefa a esse
        status, ou verifique as suas tarefas nos outros passos.
      </p>
      <span
        onClick={(e) => handleAddTask()}
        className="underline decoration-yellow-400 decoration-2 transition-all
          hover:text-yellow-400 mt-4 font-poppins cursor-pointer text-lg text-black font-semibold flex gap-4 item-end"
      >
        <div className="animate-shake transition-all">
          <FaRegHandPointRight size="20" />
        </div>
        Adicionar tarefa!
      </span>
    </div>
  );
};

export default AlertNotTask;
