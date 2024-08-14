// src/components/sidebar/SidebarWrapper.tsx
import Providers from '../Providers';
import { Sidebar } from './Sidebar';

const SidebarWrapper = () => (
  <Providers>
    <Sidebar />
  </Providers>
);

export default SidebarWrapper;
