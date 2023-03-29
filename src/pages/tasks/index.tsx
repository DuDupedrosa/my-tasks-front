import TheHeader from '@/components/TheHeader';
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import ToDoTasks from '@/components/Tasks/ToDoTasks';
import FirstTaskAlert from '@/components/Tasks/FirstTaskAlert';
import ButtonAddTask from '@/components/Tasks/ButtonAddTask';
import { TaskInput, TaskLabel } from '@/components/Form/Task/styles/input';
import Select from 'react-select';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessageInputDefault from '@/components/Form/ErrorMessageInputDefault';
import { useCreateTask } from './api/usePostTask';
import SubmitButton from '@/components/Form/LoginFormComponents/SubmitButton';
import {
  errorDefaultToast,
  errorDefaultToastMessage,
  successDefaultMessage,
  successDefaultToast,
} from '@/components/Toast/DefaultToasts';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { QueryClient } from 'react-query';
import { useEditTask } from './api/usePutTask';

type DialogFormTypes = {
  name: string;
  description: string;
};

interface DialogProps {
  open: boolean;
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

const Tasks = () => {
  const [openModalAddTask, setOpenModalAddTask] = React.useState(false);
  const [selectedPriority, setSelectedPriority] = React.useState<{
    label: string;
    value: number;
  } | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<{
    label: string;
    value: string;
    tailwindProp: string;
  } | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<{
    label: string;
    value: number;
  } | null>(null);
  const [selectedPriorityRequired, setSelectedPriorityRequired] =
    React.useState<boolean>(false);
  const [selectedColorRequired, setSelectedColorRequired] =
    React.useState<boolean>(false);
  const [selectedStatusRequired, setSelectedStatusRequired] =
    React.useState<boolean>(false);
  const [defaultPriority, setDefaultPriority] = React.useState<{
    label: string;
    value: number;
  } | null>(null);
  const [defaultColor, setDefaultColor] = React.useState<{
    label: string;
    value: string;
    tailwindProp: string;
  } | null>(null);
  const [defaultStatus, setDefaultStatus] = React.useState<{
    label: string;
    value: number;
  } | null>(null);
  const [editTask, setEditTask] = React.useState(false);
  const [editTaskId, setEditTaskId] = React.useState<string>('');

  // apis
  const createTaskMutation = useCreateTask();
  const editTaskMutation = useEditTask();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DialogFormTypes>();

  const priorityOption = [
    {
      label: '1 (Importante)',
      value: 1,
    },
    {
      label: '2 (Muito Importante)',
      value: 2,
    },
    {
      label: '3 (Extramente Importante)',
      value: 3,
    },
  ];

  const colorsOptions = [
    {
      label: 'Azul',
      value: '#0ea5e9',
      tailwindProp: 'sky-500',
    },
    {
      label: 'Vermelho',
      value: '#be123c',
      tailwindProp: 'red-700',
    },
    {
      label: 'Amarelo',
      value: '#facc15',
      tailwindProp: 'yellow-400',
    },
    {
      label: 'Violeta',
      value: '#6d28d9',
      tailwindProp: 'violet-700',
    },
    {
      label: 'Cinsa',
      value: '#111827',
      tailwindProp: 'gray-900',
    },
  ];

  const statusOptions = [
    {
      label: 'Pendente',
      value: 1,
    },
    {
      label: 'Em andamento',
      value: 2,
    },
    {
      label: 'Finalizado',
      value: 3,
    },
  ];

  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: '#ffffff',
      border: '2px solid #181b23',
      color: '#000000',
      minHeight: '44px',
      minWidth: '120px',
      marginTop: '10px',
      ':hover': {
        borderColor: '#181b23',
      },
    }),
    option: (styles: any) => {
      return {
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        padding: '8px',
        ':hover': {
          backgroundColor: '#7c3aed',
        },
        fontSize: '16px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '400',
        transition: '0.2s',
      };
    },
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: '#7c3aed',
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: '#000000',
      fontSize: '12px',
      fontWeight: 'normal',
      fontFamily: 'Roboto, sans-serif',
    }),
  };

  function handleSelectedPriority(e: any) {
    setSelectedPriority(e);
  }

  function handleSelectedColor(e: any) {
    setSelectedColor(e);
  }

  function handleSelectedStatus(e: any) {
    setSelectedStatus(e);
  }

  interface PayloadInterface {
    name: string;
    description: string;
    priority: null | number;
    color: null | string;
    status: null | number;
    _id?: string;
  }

  const onSubmit: SubmitHandler<DialogFormTypes> = (data) => {
    let payload: PayloadInterface = {
      ...data,
      priority: null,
      color: null,
      status: null,
    };

    if (editTask) {
      payload._id = editTaskId;
    }
    // checkValues();

    if (selectedPriority && selectedPriority.value) {
      payload.priority = selectedPriority.value;
    }

    if (selectedColor && selectedColor.value) {
      payload.color = selectedColor.value;
    }

    if (selectedStatus && selectedStatus.value) {
      payload.status = selectedStatus.value;
    }

    // melhorar esse controle de required
    if (
      selectedPriority &&
      selectedPriority.value &&
      selectedColor &&
      selectedColor.value &&
      selectedStatus &&
      selectedStatus.value
    ) {
      console.log('%c⧭', 'color: #408059', payload);
      if (editTask) {
        editTaskMutation.mutate(payload);
      } else {
        createTaskMutation.mutate(payload);
      }
    }
  };

  function checkValues() {
    if (selectedPriority && selectedPriority.value) {
      setSelectedPriorityRequired(false);
    } else {
      setSelectedPriorityRequired(true);
    }

    if (selectedColor && selectedColor.value) {
      setSelectedColorRequired(false);
    } else {
      setSelectedColorRequired(true);
    }

    if (selectedStatus && selectedStatus.value) {
      setSelectedStatusRequired(false);
    } else {
      setSelectedStatusRequired(true);
    }
  }

  const resetDialogValues = () => {
    setValue('name', '');
    setValue('description', '');
    setDefaultPriority(null);
    setSelectedPriority(null);
    setDefaultColor(null);
    setSelectedColor(null);
    setSelectedStatus(null);
    setDefaultStatus(null);
    setEditTask(false);
    setEditTaskId('');
  };

  // estados para retirar a mensagem de required ao clique
  React.useEffect(() => {
    if (selectedPriorityRequired) {
      if (selectedPriority && selectedPriority.value) {
        setSelectedPriorityRequired(false);
      }
    }
  }, [selectedPriority]);

  React.useEffect(() => {
    if (selectedColorRequired) {
      if (selectedColor && selectedColor.value.length) {
        setSelectedColorRequired(false);
      }
    }
  }, [selectedColor]);

  React.useEffect(() => {
    if (selectedStatusRequired) {
      if (selectedStatus && selectedStatus.value) {
        setSelectedStatusRequired(false);
      }
    }
  }, [selectedStatus]);

  // api - post
  React.useEffect(() => {
    if (createTaskMutation.isSuccess) {
      successDefaultToast(successDefaultMessage);
      setOpenModalAddTask(false);
    }
  }, [createTaskMutation.isSuccess]);

  React.useEffect(() => {
    if (createTaskMutation.isError) {
      errorDefaultToast(errorDefaultToastMessage);
      setOpenModalAddTask(true);
    }
  }, [createTaskMutation.isError]);

  // api - put
  React.useEffect(() => {
    if (editTaskMutation.isSuccess) {
      successDefaultToast(successDefaultMessage);
      setOpenModalAddTask(false);
    }
  }, [editTaskMutation.isSuccess]);

  React.useEffect(() => {
    if (editTaskMutation.isError) {
      errorDefaultToast(errorDefaultToastMessage);
      setOpenModalAddTask(true);
    }
  }, [editTaskMutation.isError]);

  // effects
  React.useEffect(() => {
    if (!openModalAddTask) {
      resetDialogValues();
    }
  }, [openModalAddTask]);

  const handleEditTask = (task: Task) => {
    setOpenModalAddTask(true);
    setEditTask(true);

    // preenchendo os valores
    setValue('name', task.name);
    setValue('description', task.description);
    setEditTaskId(task._id);

    const priorityValue = priorityOption.find(
      (item) => item.value === task.priority
    );

    const colorValue = colorsOptions.find((item) => item.value === task.color);

    const statusValue = statusOptions.find(
      (item) => item.value === task.status
    );

    if (priorityValue) {
      setDefaultPriority(priorityValue);
      setSelectedPriority(priorityValue);
    }

    if (colorValue) {
      setDefaultColor(colorValue);
      setSelectedColor(colorValue);
    }

    if (statusValue) {
      setSelectedStatus(statusValue);
      setDefaultStatus(statusValue);
    }
  };

  return (
    <>
      <div className="bg-main pt-5 pb-5 md:pl-14 md:pr-14 pl-5 pr-5">
        <TheHeader />
      </div>
      <div className="md:pl-14 md:pr-14 pl-5 pr-5 relative">
        <div
          className="absolute right-20 -top-16"
          onClick={() => {
            console.log('%c⧭', 'color: #bfffc8', 'abri', openModalAddTask);
            setOpenModalAddTask(true);
          }}
        >
          <ButtonAddTask />
        </div>
        <Tabs.Root className="TabsRoot mt-32" defaultValue="tab1">
          <Tabs.List className="TabsList" aria-label="Manage your account">
            <Tabs.Trigger className="TabsTrigger" value="tab1">
              <span className="block font-poppins text-lg text-violet-700 font-semibold uppercase cursor-pointer">
                Para fazer
              </span>
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="tab2">
              <span className="block font-poppins text-lg text-violet-700 font-semibold uppercase cursor-pointer">
                Em andamento
              </span>
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="tab3">
              <span className="block font-poppins text-lg text-violet-700 font-semibold uppercase cursor-pointer">
                Finalizadas
              </span>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="tab1">
            <ToDoTasks handleOpenEditDialog={(task) => handleEditTask(task)} />
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <p>content 2</p>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab3">
            <p>content 3</p>
          </Tabs.Content>
        </Tabs.Root>
        <FirstTaskAlert handleAddTask={() => setOpenModalAddTask(true)} />

        {/* modal */}
        <div>
          <Modal
            isOpen={openModalAddTask}
            onClose={() => setOpenModalAddTask(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="DialogTitle text-center">
                <span className="font-poppins text-xl mb-4 block text-black font-medium">
                  Adicionar Tarefa
                </span>
                <p className="text-center">
                  Preenche os campos abaixo, para adicionar sua tarefa
                </p>
              </ModalHeader>
              <ModalCloseButton className="cursor-pointer" />
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)} className="pb-2">
                  <div>
                    <label htmlFor="name" className={TaskLabel}>
                      Titulo*
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={TaskInput}
                      {...register('name', { required: true })}
                    />
                    {errors.name && <ErrorMessageInputDefault />}
                  </div>
                  <div className="mt-5">
                    <label htmlFor="name" className={TaskLabel}>
                      Descrição*
                    </label>
                    <textarea
                      className={TaskInput}
                      {...register('description', { required: true })}
                    ></textarea>
                    {errors.description && <ErrorMessageInputDefault />}
                  </div>
                  <div className="mt-5">
                    <span className={TaskLabel}>Prioridade*</span>
                    <Select
                      defaultValue={defaultPriority}
                      options={priorityOption}
                      styles={colourStyles}
                      placeholder="Selecione"
                      onChange={(e) => handleSelectedPriority(e)}
                    />
                    {selectedPriorityRequired && <ErrorMessageInputDefault />}
                  </div>
                  <div className="relative mt-5">
                    <span className={TaskLabel}>Cor de fundo*</span>
                    <Select
                      defaultValue={defaultColor}
                      options={colorsOptions}
                      styles={colourStyles}
                      placeholder="Selecione"
                      onChange={(e) => handleSelectedColor(e)}
                    />
                    <span
                      className={`bg- absolute right-12 top-12 w-5 h-5 rounded-full`}
                      style={{ backgroundColor: selectedColor?.value }}
                    ></span>
                    {selectedColorRequired && <ErrorMessageInputDefault />}
                  </div>
                  <div className="mt-5">
                    <span className={TaskLabel}>Status*</span>
                    <Select
                      defaultValue={defaultStatus}
                      options={statusOptions}
                      styles={colourStyles}
                      placeholder="Selecione"
                      onChange={(e) => handleSelectedStatus(e)}
                    />
                    {selectedStatusRequired && <ErrorMessageInputDefault />}
                  </div>
                  <div className="mt-5">
                    <SubmitButton
                      loadingColor="#ffffff"
                      loadingSize="20"
                      label="Adicionar"
                      loading={
                        createTaskMutation.isLoading ||
                        editTaskMutation.isLoading
                      }
                    />
                  </div>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Tasks;
