import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { clearCredentials } from '../redux/slices/authSlice';
import { useLogoutMutation } from '../redux/slices/apiUserSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [logoutApiCall] = useLogoutMutation();

    async function logoutHandler() {
        try {
            await logoutApiCall().unwrap();
            dispatch(clearCredentials());
            navigate('/');
        } catch (error) {
            toast.error(`Logout Error ocurred`, {
                theme: 'light',
            });
        }
    }

    return (
        <section className='fixed z-20 w-full mx-auto bg-slate-700 text-slate-200'>
            <nav className='container mx-auto flex flex-row justify-between items-center text-xl py-4'>
                <Link
                    className='text-3xl font-semibold flex justify-center items-end gap-4'
                    to={'/'}
                >
                    <span>MERN Auth Jwt</span>
                    {userInfo && <span className='text-base'>({userInfo.name})</span>}
                </Link>
                <ul className='flex items-center gap-4'>
                    {userInfo ? (
                        <li>
                            <button
                                onClick={logoutHandler}
                                className='flex items-center gap-3 border rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-slate-200 hover:text-slate-800'
                            >
                                <svg
                                    className='fill-current'
                                    width='24px'
                                    height='24px'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path d='M 12.375052,3.0053059e-7 C 13.770332,-2.7699469e-5 14.901442,1.0745193 14.901419,2.4000353 v 4.799948 c 0,1.600031 -2.526367,1.600031 -2.526367,0 v -4.799948 l -9.848689,0 V 21.599965 l 9.848689,0 v -4.799947 c 0,-1.600032 2.526367,-1.600032 2.526367,0 v 4.799947 C 14.901441,22.925483 13.770332,24.000027 12.375052,24 L 2.526363,24 C 1.131083,24.000027 -2.2999649e-5,22.925479 0,21.599965 V 2.4000353 C -2.1999649e-5,1.0745193 1.131086,-2.7699469e-5 2.526367,3.0053059e-7 Z M 17.641233,5.9981423 c -1.084113,0.0736 -1.57496,1.323841 -0.806366,2.053901 l 2.9014,2.7479357 H 5.1001599 v 2.400036 H 19.736247 l -2.9014,2.747935 c -0.498214,0.469417 -0.498214,1.234618 0,1.704035 0.2384,0.224634 0.561133,0.349834 0.8969,0.347967 0.335733,0.0018 0.658423,-0.123367 0.8968,-0.347967 L 23.6812,12.851964 c 0.49814,-0.469403 0.49814,-1.234531 0,-1.703934 L 18.628567,6.3480093 C 18.368433,6.1008753 18.00818,5.9732153 17.641233,5.9981423 Z' />
                                </svg>
                                Sign out
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to={'/login'}
                                    className='flex items-center gap-3 border rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-slate-200 hover:text-slate-800'
                                >
                                    <svg
                                        className='fill-current'
                                        width='24px'
                                        height='24px'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M 8.84212,3.0053679e-7 C 7.44684,-2.7857685e-5 6.31573,1.0745189 6.3157533,2.4000356 V 7.199983 c 0,1.6000313 2.5263667,1.6000313 2.5263667,0 V 2.4000356 H 21.473637 V 21.599965 H 8.84212 v -4.799947 c 0,-1.600032 -2.5263667,-1.600032 -2.5263667,0 v 4.799947 C 6.3157313,22.925483 7.44684,24.000027 8.84212,24 H 21.473637 C 22.868917,24.000027 24.000023,22.925479 24,21.599965 V 2.4000356 C 24.000022,1.0745189 22.868914,-2.7857685e-5 21.473633,3.0053679e-7 Z M 12.541073,5.998142 c -1.084113,0.0736 -1.57496,1.3238411 -0.806366,2.0539017 l 2.9014,2.7479353 H 0 v 2.400036 h 14.636087 l -2.9014,2.747935 c -0.498214,0.469417 -0.498214,1.234618 0,1.704035 0.2384,0.224634 0.561133,0.349834 0.8969,0.347967 0.335733,0.0018 0.658423,-0.123367 0.8968,-0.347967 l 5.052653,-4.800021 c 0.49814,-0.469403 0.49814,-1.234531 0,-1.703934 L 13.528407,6.3480089 C 13.268273,6.1008754 12.90802,5.9732153 12.541073,5.998142 Z' />
                                    </svg>
                                    Sign in
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={'/register'}
                                    className='flex items-center gap-3 border rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-slate-200 hover:text-slate-800'
                                >
                                    <svg
                                        className='fill-current'
                                        width='24px'
                                        height='24px'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='m 21.459291,2.4000353 h -9.848689 l 4e-6,-2.40003499946941 h 9.848685 C 22.854571,-2.7699469e-5 23.985681,1.0745193 23.985658,2.4000353 V 21.599965 C 23.98568,22.925483 22.854571,24.000027 21.459291,24 H 7.7900734 C 6.3947934,24.000027 5.263687,22.925479 5.26371,21.599965 v -3.579673 l 2.5263634,-0.05358 v 3.633254 H 21.459291 Z M 13.977727,5.5156475 C 13.1591,4.8011075 11.927965,5.3380795 11.955213,6.3977885 L 12.063728,10.392472 1.7144381,0.04318113 0.01735607,1.7402628 10.366633,12.08954 6.3719491,11.981024 c -0.684218,-0.02036 -1.225297,0.520716 -1.204934,1.204934 0.0097,0.327415 0.149411,0.644151 0.388154,0.880254 0.236126,0.238672 0.552809,0.378342 0.880183,0.388084 l 6.9668929,0.178638 c 0.684156,0.02032 1.225183,-0.520707 1.204863,-1.204864 L 14.428484,6.4611915 c -0.0092,-0.358693 -0.17366,-0.703699 -0.450757,-0.945544 z' />
                                    </svg>
                                    Sign up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </section>
    );
};

export default Navbar;
