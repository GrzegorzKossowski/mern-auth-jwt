import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateAdminRouteProps {
    toLogin?: boolean;
}

const PrivateAdminRoute = ({
    toLogin
}: PrivateAdminRouteProps) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    if (userInfo && userInfo.isAdmin) return <Outlet />;
    return toLogin ? <Navigate to='/login' replace /> : null;
};

export default PrivateAdminRoute;
