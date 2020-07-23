import Dashboard from '@plugins/dashboard/pages/Dashboard';
import Account from '@plugins/ragnarok/account/pages/Accounts';
import RoutesInterface from '@core/interfaces/routes';

// Todo: register routes via plugins
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
