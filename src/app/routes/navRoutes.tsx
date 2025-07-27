import type { RoutesProps } from '@app/types';
import { TableDestinationPage } from '@pages/admin/tableDestination';
import { HomePage } from '@pages/homePage';
import { NotFoundPage } from '@pages/notFoundPage';
import { SignIn } from '@pages/signIn';
import { SignUp } from '@pages/signUp';

export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/sign_up',
  SIGN_IN: '/sign_in',
  TABLE_DESTINATION: '/admin/destinations',
  NOT_FOUND: '*',
};

export const navRoutes: RoutesProps = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.SIGN_IN, element: <SignIn /> },
  { path: ROUTES.SIGN_UP, element: <SignUp /> },
  { path: ROUTES.TABLE_DESTINATION, element: <TableDestinationPage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];
