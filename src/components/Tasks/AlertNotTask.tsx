import React from 'react';

interface AlertProps {
  step: string;
}

const AlertNotTask = ({ step }: AlertProps) => {
  return (
    <div>
      <p className="font-poppins text-sm text-black font-medium  bg-yellow-400 rounded-lg pr-2 pl-2 pt-4 pb-4 max-w-max">
        Ops! parece que você não tem nenhuma tarefa{' '}
        <span className="font-bold">{step}</span>, adicione uma tarefa a esse
        status, ou verifique as suas tarefas nos outros passos.
      </p>
    </div>
  );
};

export default AlertNotTask;
