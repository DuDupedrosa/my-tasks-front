import React from 'react';
import { BsTrash3Fill } from 'react-icons/bs';
import LoadingCircularProgress from '../LoadingCircularProgress';
import { useGetTasksFinalized } from './api/useGetTasksFinalized';
import { BsFillPencilFill } from 'react-icons/bs';
import AlertNotTask from './AlertNotTask';

interface ToDoTasksProps {
  handleOpenEditDialog: (taskToDoEdit: Task) => void;
  handleOpenDeleteDialog: (taskToDoEdit: Task) => void;
}

interface Task {
  color: string;
  description: string;
  name: string;
  priority: number;
  status: number;
  userId: string;
  _id: string;
}

const FinalizedTasks = ({
  handleOpenEditDialog,
  handleOpenDeleteDialog,
}: ToDoTasksProps) => {
  const getTasksMutation = useGetTasksFinalized();

  const handleEdiTask = (e: Task) => {
    handleOpenEditDialog(e);
  };

  const handleDeleteTask = (e: Task) => {
    handleOpenDeleteDialog(e);
  };

  return (
    <>
      {getTasksMutation.status === 'loading' && <LoadingCircularProgress />}
      {getTasksMutation.status !== 'loading' && (
        <>
          {getTasksMutation.data.length === 0 && (
            <AlertNotTask step="Finalizada" />
          )}
          {getTasksMutation.data && getTasksMutation.data.length > 0 && (
            <div className="flex gap-5 md:gap-10 flex-wrap">
              {getTasksMutation.data.map((item: Task, i: number) => {
                return (
                  <div
                    className="w-[260px] h-[260px] rounded-lg p-2 relative"
                    style={{ backgroundColor: `${item.color}` }}
                    key={i}
                  >
                    <h2
                      onClick={(e) => handleEdiTask(item)}
                      className="cursor-pointer border-b-2 border-solid border-b-white pb-2 text-white font-poppins text-lg text-center font-semibold"
                    >
                      {item.name}
                    </h2>
                    <p
                      onClick={(e) => handleEdiTask(item)}
                      className="cursor-pointer text-gray-100 font-poppins text-xs text-center mt-5 font-normal leading-normal h-[100px]"
                    >
                      {item.description.substring(0, 200)}...
                    </p>
                    <div
                      className="absolute bottom-5 left-5"
                      onClick={(e) => handleEdiTask(item)}
                    >
                      <BsFillPencilFill
                        className="text-white cursor-pointer"
                        size="20"
                      />
                    </div>
                    <div className="absolute bottom-5 right-5">
                      <BsTrash3Fill
                        onClick={(e) => handleOpenDeleteDialog(item)}
                        className="text-red-700 cursor-pointer"
                        size="20"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FinalizedTasks;
