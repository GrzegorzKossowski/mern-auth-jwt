import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const AppWrapper = () => {
    return <RouterProvider router={router} />;
};

export default AppWrapper;
