import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { MainLayout } from '../../layouts/MainLayout';
import { LandingPage } from '../../pages/LandingPage';
import { LoginPage } from '../../pages/LoginPage';
import { ConsultingPage } from '../../pages/ConsultingPage';
import { LobbyPage } from '../../pages/LobbyPage';
import { BattlePage } from '../../pages/BattlePage';
import { BattleResultPage } from '../../pages/BattleResultPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/lobby', element: <LobbyPage /> },
          { path: '/consultando', element: <ConsultingPage /> },
          { path: '/battle/:battleId', element: <BattlePage /> },
          { path: '/battle/:battleId/result', element: <BattleResultPage /> },
          { path: '/profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
