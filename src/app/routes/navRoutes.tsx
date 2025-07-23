import type { RoutesProps } from '@app/types';
import { About } from '@pages/about';
import { TableAircraftPage } from '@pages/admin/tableAircraft';
import { Contact } from '@pages/contact';
import { HomePage } from '@pages/homePage';
import { NotFoundPage } from '@pages/notFoundPage';
import { PrivacyPolicy } from '@pages/privacyPolicy';
import { SignIn } from '@pages/signIn';
import { SignUp } from '@pages/signUp';

export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/sign_up',
  SIGN_IN: '/sign_in',
  TABLE_PLANE: '/aircrafts',
  ABOUT_US: '/about_us',
  CONTACT_US: '/contact_us',
  PRIVACY_POLICY: '/privacy_policy',
  NOT_FOUND: '*',
};

export const navRoutes: RoutesProps = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.SIGN_IN, element: <SignIn /> },
  { path: ROUTES.SIGN_UP, element: <SignUp /> },
  { path: ROUTES.ABOUT_US, element: <About /> },
  { path: ROUTES.CONTACT_US, element: <Contact /> },
  { path: ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { path: ROUTES.TABLE_PLANE, element: <TableAircraftPage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];
