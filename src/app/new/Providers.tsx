// src/components/sidebar/SidebarWrapper.tsx
import Providers from '@/components/Providers';
import TaskForm from './task-form';

const SidebarWrapper = () => {
  return (
    <Providers>
      <TaskForm />
    </Providers>
  );
};

export default SidebarWrapper;
