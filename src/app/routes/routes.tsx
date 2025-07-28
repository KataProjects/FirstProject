import { ROUTES, navRoutes } from '@app/routes';
import { Layout } from '@widgets/layouts';

import { Route, Routes } from 'react-router';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        {navRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};