import { Dashboard, Account } from '@/pages';
import RoutesInterface from '@/interfaces/routes';

const routes: RoutesInterface[] = [
  {
    path: '/admin',
    name: 'Dashboard',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/admin/accounts',
    name: 'Dashboard',
    component: Account,
  },
];

export default routes;
