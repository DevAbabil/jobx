import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AdminLayout;
