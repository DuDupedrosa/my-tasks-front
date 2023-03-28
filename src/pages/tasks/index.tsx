import TheHeader from '@/components/TheHeader';
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import ToDoTasks from '@/components/Tasks/ToDoTasks';
import FirstTaskAlert from '@/components/Tasks/FirstTaskAlert';
import ButtonAddTask from '@/components/Tasks/ButtonAddTask';
import AddTaskDialog from '@/components/Tasks/Dialogs/AddTaskDialog';

const Tasks = () => {
  const [openModalAddTask, setOpenModalAddTask] = React.useState(false);

  return (
    <>
      <div className="bg-main pt-5 pb-5 md:pl-14 md:pr-14 pl-5 pr-5">
        <TheHeader />
      </div>
      <div className="md:pl-14 md:pr-14 pl-5 pr-5 relative">
        <div className="absolute right-20 -top-16">
          <AddTaskDialog addTextString={false} />
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
            <ToDoTasks />
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <p>content 2</p>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab3">
            <p>content 3</p>
          </Tabs.Content>
        </Tabs.Root>
        <FirstTaskAlert handleAddTask={() => setOpenModalAddTask(true)} />
        <AddTaskDialog addTextString={true} />
      </div>
    </>
  );
};

export default Tasks;
