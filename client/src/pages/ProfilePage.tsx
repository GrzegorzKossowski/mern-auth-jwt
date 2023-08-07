import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';

export const Component = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { name, email, isAdmin } = userInfo;
    const navigate = useNavigate();
    function editHandler() {
        navigate('/profile/edit');
    }

    return (
        <section className='w-full h-screen'>
            <div className='container mx-auto flex flex-col items-center justify-center h-full'>
                <div className='max-w-sm'>
                    <img
                        className='w-48 h-48 mx-auto -mb-24 rounded-full'
                        src={`/images/person/${
                            isAdmin ? 'admin' : 'avatar'
                        }.jpg`}
                        alt={name}
                    />
                    <div
                        className={`space-y-4 px-8 pt-32 pb-10 text-gray-400 rounded-lg shadow-lg ${
                            isAdmin
                                ? 'border border-red-700 shadow-red-400'
                                : ''
                        }`}
                    >
                        <h3 className='text-xl text-gray-800 font-title'>
                            {name}
                        </h3>
                        <div className='font-semibold'>
                            {!isAdmin && 'Is not'} Admin
                        </div>
                        <p className='text-sm font-body'>
                            {isAdmin ? (
                                <span>
                                    Repudiandae dolorum dolor commodi atque,
                                    vitae molestias qui totam ut distinctio ad
                                    quisquam vero exercitationem deserunt cumque
                                    sapiente asperiores at provident vel?
                                </span>
                            ) : (
                                <span>
                                    This user is not an admin. To login as
                                    admin, use{' '}
                                    <span className='font-semibold'>
                                        mary@sue.com
                                    </span>
                                </span>
                            )}
                        </p>
                        <div>
                            <Link
                                className='text-blue-500 font-body hover:text-gray-800'
                                to='/profile'
                            >
                                {email}
                            </Link>
                        </div>
                        <div className='flex justify-end'>
                            <button
                                className='border py-2 px-3 rounded-lg bg-slate-600 text-slate-200'
                                onClick={editHandler}
                            >
                                Edit profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
