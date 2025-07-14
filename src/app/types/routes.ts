import type { ReactNode } from 'react';

export type RouteProps = {
  path: string;
  element: ReactNode;
};

export type RoutesProps = RouteProps[];
