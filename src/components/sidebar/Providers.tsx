// src/components/sidebar/SidebarWrapper.tsx
import Providers from '../Providers';
import { Sidebar } from './Sidebar';

const SidebarWrapper = () => {
  return (
    <Providers>
      <Sidebar />
    </Providers>
  );
};

export default SidebarWrapper;
