import { Route, Routes } from 'react-router';

import { navRoutes } from './navRoutes';

export const AppRoutes = () => {
  return (
    <Routes>
      {navRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
