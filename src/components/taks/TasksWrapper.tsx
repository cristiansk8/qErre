// src/components/sidebar/SidebarWrapper.tsx
import Providers from '../Providers';
import UserTasks from './tasks';

const TasksWrapper = () => (
  <Providers>
    <UserTasks />
  </Providers>
);

export default TasksWrapper;