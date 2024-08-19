// src/components/sidebar/SidebarWrapper.tsx
import Providers from '../Providers';
import UserTasks from './tasks';

const SidebarWrapper = () => {
  return (
    <Providers>
      <UserTasks />
    </Providers>
  );
};

export default SidebarWrapper;