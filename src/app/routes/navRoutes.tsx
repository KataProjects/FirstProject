import type { RoutesProps } from '@app/types';
import { HomePage } from '@pages/homePage';
import { NotFoundPage } from '@pages/notFoundPage';
import { SignIn } from '@pages/signIn';
import { SignUp } from '@pages/signUp';
import { TableAircraftPage } from '@pages/admin/tableAircraft';

export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/sign_up',
  SIGN_IN: '/sign_in',
  TABLE_PLANE: '/aircrafts',
  NOT_FOUND: '*',
};

export const navRoutes: RoutesProps = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.SIGN_IN, element: <SignIn /> },
  { path: ROUTES.SIGN_UP, element: <SignUp /> },
  { path: ROUTES.TABLE_PLANE, element: <TableAircraftPage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];
