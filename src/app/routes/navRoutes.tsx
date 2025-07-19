import { HomePage } from '@pages/homePage';
import { SignIn } from '@pages/signIn';
import { SignUp } from '@pages/signUp';
import { NotFoundPage } from '@pages/notFoundPage';

import type { RoutesProps } from '@app/types';

export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/sign_up',
  SIGN_IN: '/sign_in',
  NOT_FOUND: '*',
};

export const navRoutes: RoutesProps = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.SIGN_IN, element: <SignIn /> },
  { path: ROUTES.SIGN_UP, element: <SignUp /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];
