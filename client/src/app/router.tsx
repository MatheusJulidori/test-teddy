import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { lazy } from 'react'

const RootRoute = createRootRoute({
  component: () => <div><Outlet /></div>,
})

const loginRoute = createRoute({
  path: '/login',
  getParentRoute: () => RootRoute,
  component: lazy(() => import('./routes/login')),
})

const homeRoute = createRoute({
  path: '/',
  getParentRoute: () => RootRoute,
  component: lazy(() => import('./routes/index')),
})

const clientsRoute = createRoute({
  path: '/clients',
  getParentRoute: () => RootRoute,
  component: lazy(() => import('./routes/clients')),
})

const selectedRoute = createRoute({
  path: '/selected',
  getParentRoute: () => RootRoute,
  component: lazy(() => import('./routes/selected')),
})

const routeTree = RootRoute.addChildren([
  loginRoute,
  homeRoute,
  clientsRoute,
  selectedRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}