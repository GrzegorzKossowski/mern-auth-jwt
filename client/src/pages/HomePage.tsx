import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';

const HomePage = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    return (
        <section className='w-full h-screen flex justify-center'>
            <div className='border rounded-3xl max-w-4xl bg-slate-200 self-center p-[100px] text-center space-y-4'>
                <h1 className='text-5xl font-bolder'>MERN Authentication</h1>
                <p className='text-xl'>
                    MERN auth with JWT token stored as http-only cookie, redux,
                    tailwind
                </p>
                <div className='flex items-center justify-center gap-4'>
                    {userInfo ? (
                        <Link
                            to='/login'
                            className='border border-slate-900 rounded-lg py-2 px-3 bg-slate-800 text-slate-200'
                        >
                            <img
                                className='w-28 h-28'
                                src={
                                    '/images/person/' +
                                    (userInfo.isAdmin ? 'admin' : '') +
                                    'avatar.jpg'
                                }
                                alt={userInfo.name}
                            />
                            Profile
                        </Link>
                    ) : (
                        <>
                            <Link
                                to='/login'
                                className='border border-slate-900 rounded-lg py-2 px-3 bg-slate-800 text-slate-200'
                            >
                                Sign In
                            </Link>
                            <Link
                                to='/register'
                                className='border border-slate-900 rounded-lg py-2 px-3 bg-slate-300'
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomePage;
