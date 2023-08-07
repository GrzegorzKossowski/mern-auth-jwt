import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    toLogin?: boolean;
}

const PrivateRoute = ({ toLogin }: PrivateRouteProps) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    if (userInfo) return <Outlet />;
    return <Navigate to={`${toLogin ? '/login' : '/'}`} replace />;
};

export default PrivateRoute;
