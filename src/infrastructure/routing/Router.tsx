import { lazy } from 'react';
import { Suspense } from './Suspense';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import PageLayout from '@/ui/layouts/PageLayout';

const NotFound = lazy(() => import('@/ui/pages/NotFound'));
const Home = lazy(() => import('@/ui/pages/home/Home'));

export const router = createBrowserRouter([
    {
        path: '',
        element: <PageLayout />,
        children: [
            {
                path: '',
                element: <Navigate to="/home" replace />,
            },
            {
                path: '/home',
                element: Suspense(Home),
            },
        ],
    },
    {
        path: '*',
        element: Suspense(NotFound),
    },
]);
