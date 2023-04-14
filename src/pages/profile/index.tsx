import EditPassword from '@/components/Profile/EditPassword';
import EditProfile from '@/components/Profile/EditProfile';
import UseHeader from '@/components/UserHeader';
import * as Tabs from '@radix-ui/react-tabs';

import React from 'react';

const Profile = () => {
  return (
    <div>
      <div className="bg-main pt-5 pb-5 md:pl-14 md:pr-14 pl-5 pr-5">
        <UseHeader />
      </div>
      <Tabs.Root
        className="TabsRoot mt-20 md:pl-14 md:pr-14 pl-5 pr-5"
        defaultValue="tab1"
      >
        <Tabs.List
          className="TabsList overflow-x-scroll md:overflow-x-hidden md:pb-0 pb-4"
          aria-label="Manage your account"
        >
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            <span className="block font-poppins text-sm whitespace-nowrap md:text-lg text-violet-700 font-semibold uppercase cursor-pointer">
              Editar perfil
            </span>
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            <span className="block font-poppins text-sm whitespace-nowrap md:text-lg text-violet-700 font-semibold uppercase cursor-pointer">
              Editar senha
            </span>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <EditProfile />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <EditPassword />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default Profile;
