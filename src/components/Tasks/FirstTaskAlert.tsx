import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaRegHandPointRight } from 'react-icons/fa';

interface FirstTaskAlertProps {
  handleAddTask: () => void;
}

const FirstTaskAlert = ({ handleAddTask }: FirstTaskAlertProps) => {
  return (
    <>
      <div>
        <p className="font-poppins text-sm text-black font-medium  bg-yellow-400 rounded-lg pr-2 pl-2 pt-4 pb-4 max-w-max">
          Ops! Parece que você é novo por aqui ou não tem, nenhuma anotação
          salva, adicione sua primeira anotação, para visualizar o quadro de
          tarefas
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
    </>
  );
};

export default FirstTaskAlert;
