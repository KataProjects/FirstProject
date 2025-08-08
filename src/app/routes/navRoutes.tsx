import type { RoutesProps } from '@app/types';
import { About } from '@pages/about';
import { TableAircraftPage } from '@pages/admin/tableAircraft';
import { TableDestinationPage } from '@pages/admin/tableDestination';
import { TableSeatsPage } from '@pages/admin/tableSeats';
import { TableTimeZonesPage } from '@pages/admin/tableTimeZones';
import { TimeZonesPage } from '@pages/admin/timeZones/timeZonesPage.tsx';
import { Contact } from '@pages/contact';
import { HomePage } from '@pages/homePage';
import { NotFoundPage } from '@pages/notFoundPage';
import { PassengersPage } from '@pages/passengersPage';
import { PrivacyPolicy } from '@pages/privacyPolicy';
import { SignIn } from '@pages/signIn';
import { SignUp } from '@pages/signUp';
import { TicketsPage } from '@pages/ticketsPage';

export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/sign_up',
  SIGN_IN: '/sign_in',
  ABOUT_US: '/about_us',
  CONTACT_US: '/contact_us',
  PRIVACY_POLICY: '/privacy_policy',
  TABLE_AIRCRAFTS: '/admin/aircrafts',
  TABLE_DESTINATION: '/admin/destinations',
  TABLE_PASSENGERS: '/admin/passengers',
  TABLE_SEATS: '/admin/seats',
  TABLE_TIMEZONES: '/admin/timezones',
  TABLE_TICKETS: '/admin/tickets',
  TABLE_FLIGHTS: '/admin/flights',
  TABLE_BOOKINGS: '/admin/bookings',
  TABLE_BOARDING: '/admin/boarding',
  TABLE_USERS: '/admin/users',
  NOT_FOUND: '*',
};

export const navRoutes: RoutesProps = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.SIGN_IN, element: <SignIn /> },
  { path: ROUTES.SIGN_UP, element: <SignUp /> },
  { path: ROUTES.ABOUT_US, element: <About /> },
  { path: ROUTES.CONTACT_US, element: <Contact /> },
  { path: ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { path: ROUTES.TABLE_AIRCRAFTS, element: <TableAircraftPage /> },
  { path: ROUTES.TABLE_DESTINATION, element: <TableDestinationPage /> },
  { path: ROUTES.TABLE_BOARDING, element: <TableSeatsPage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
  { path: ROUTES.TABLE_TIMEZONES, element: <TableTimeZonesPage /> },
  { path: ROUTES.TABLE_PASSENGERS, element: <PassengersPage /> },
  { path: ROUTES.TABLE_TICKETS, element: <TicketsPage /> },
];
