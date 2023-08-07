import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import { Suspense } from 'react';
import PrivateRoute from '../components/PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<>Loading...</>}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: '/',
                element: <PrivateRoute toLogin />,
                children: [
                    {
                        // lazy loading by default Component name version
                        path: 'profile',
                        lazy: () => import('../pages/ProfilePage'),
                    },
                    {
                        path: 'profile/edit',
                        lazy: () => import('../pages/EditProfilePage'),
                    },
                ],
            },
            {
                // lazy loading by default Component name version
                path: 'login',
                lazy: () => import('../pages/LoginPage'),
            },
            {
                // lazy loading by component name version
                path: 'register',
                async lazy() {
                    const { RegisterPage } = await import(
                        '../pages/RegisterPage'
                    );
                    return { Component: RegisterPage };
                },
            },
        ],
    },
]);
