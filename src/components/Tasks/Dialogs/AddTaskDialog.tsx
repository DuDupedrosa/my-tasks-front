import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { TaskInput, TaskLabel } from '@/components/Form/Task/styles/input';
import Select, { StylesConfig } from 'react-select';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessageInputDefault from '@/components/Form/ErrorMessageInputDefault';
import { useCreateTask } from '../api/usePostTask';
import SubmitButton from '@/components/Form/LoginFormComponents/SubmitButton';
import {
  errorDefaultToast,
  errorDefaultToastMessage,
  successDefaultMessage,
  successDefaultToast,
} from '@/components/Toast/DefaultToasts';
import { FaRegHandPointRight } from 'react-icons/fa';
import ButtonAddTask from '../ButtonAddTask';
import { BiPlus } from 'react-icons/bi';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

interface ColorInterface {
  label: string;
  value: string;
  tailwindProp: string;
}

function useForceUpdate() {
  let [value, setState] = React.useState(true);
  return () => setState(!value);
}

type DialogFormTypes = {
  name: string;
  description: string;
};

interface DialogProps {
  addTextString: boolean;
}

function AddTaskDialog({ addTextString }: DialogProps) {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = React.useState(false);

  // apis
  const createTaskMutation = useCreateTask();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
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
  }

  const onSubmit: SubmitHandler<DialogFormTypes> = (data) => {
    let payload: PayloadInterface = {
      ...data,
      priority: null,
      color: null,
      status: null,
    };
    checkValues();

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
      createTaskMutation.mutate(payload);
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

  // api
  React.useEffect(() => {
    if (createTaskMutation.isSuccess) {
      successDefaultToast(successDefaultMessage);
      setModalOpen(false);
    }
  }, [createTaskMutation.isSuccess]);

  React.useEffect(() => {
    if (createTaskMutation.isError) {
      errorDefaultToast(errorDefaultToastMessage);
      setModalOpen(true);
    }
  }, [createTaskMutation.isError]);

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="DialogTitle text-center">
            {' '}
            <span className="font-poppins text-xl mb-4 block text-black font-medium">
              Adicionar Tarefa
            </span>
            <p className="text-center">
              Preenche os campos abaixo, para adicionar sua tarefa
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  loading={createTaskMutation.isLoading}
                />
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddTaskDialog;
