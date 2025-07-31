import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { lazy } from 'react';

const AppLayout = lazy(() => import('@/pages/AppLayout'));
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const Clients = lazy(() => import('@/pages/Clients'));
const SelectedClients = lazy(() => import('@/pages/Selected'));

const authGuard = () => {
  const username = localStorage.getItem('username');
  if (!username) throw redirect({ to: '/login' });
};

const guestOnlyGuard = () => {
  const username = localStorage.getItem('username');
  if (username) throw redirect({ to: '/' });
};

const rootRoute = createRootRouteWithContext()({
  component: () => <Outlet />,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: AppLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  loader: authGuard,
  component: Home,
});

const clientsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/clients',
  loader: authGuard,
  component: Clients,
});

const selectedRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/selected',
  loader: authGuard,
  component: SelectedClients,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  loader: guestOnlyGuard,
  component: Login,
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([homeRoute, clientsRoute, selectedRoute]),
  loginRoute,
]);

export const router = createRouter({
  routeTree,
});
