import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/slices/apiUserSlice';
import { RootState } from '../redux/store';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

export const Component = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state: RootState) => state.auth);

    const [login, { isLoading }] = useLoginMutation();

    React.useEffect(() => {
        if (userInfo) navigate('/profile');
    }, [navigate, userInfo]);

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = emailRef?.current?.value as string;
        const password = passwRef?.current?.value as string;
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/profile');
        } catch (err: any) {
            console.log(err);
            toast.error(`${err?.data?.message || err?.message || 'Error'}`, {
                theme: 'light',
            });
        }
    }

    return (
        <section className='w-full h-screen flex justify-center'>
            <div className='self-center border rounded-3xl p-4 shadow-md'>
                <div className='self-center mb-6 text-xl font-light text-center'>
                    Login
                </div>
                <div className='mt-8'>
                    <form onSubmit={submitHandler}>
                        <div className='flex flex-col mb-2'>
                            <div className='flex relative '>
                                <span className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm'>
                                    <svg
                                        className='fill-slate-600'
                                        width='24px'
                                        height='24px'
                                        viewBox='0 -3.0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M 11.989874,11.17756 9.5049722,9.1175494 0.83554431,17.992304 H 22.923889 L 14.414076,9.1025621 Z m 3.664405,-3.0169523 8.244536,8.5720103 c 0.04721,-0.16636 0.08093,-0.338714 0.08093,-0.52081 V 1.3953215 Z M 0,1.3608506 V 16.211808 c 0,0.182096 0.03372152,0.35445 0.08093165,0.52081 L 8.353195,8.1883342 Z M 23.23038,0 H 0.74936709 L 11.989874,9.0066431 Z'></path>
                                    </svg>
                                </span>
                                <input
                                    ref={emailRef}
                                    type='email'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 shadow-sm text-base '
                                    placeholder='Your email'
                                    // defaultValue={'john@doe.com'}
                                    minLength={4}
                                    maxLength={50}
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <div className='flex relative '>
                                <span className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm'>
                                    <svg
                                        className='fill-slate-600'
                                        width='24px'
                                        height='24px'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M 1.405884,3.805884 C 0,5.21178 0,7.474512 0,12 0,16.52544 0,18.78828 1.405884,20.19408 2.81178,21.6 5.074512,21.6 9.6,21.6 h 4.8 c 4.52544,0 6.78828,0 8.19408,-1.40592 C 24,18.78828 24,16.52544 24,12 24,7.474512 24,5.21178 22.59408,3.805884 21.18828,2.4 18.92544,2.4 14.4,2.4 H 9.6 c -4.525488,0 -6.78822,0 -8.194116,1.405884 z M 7.2,13.2 C 7.862736,13.2 8.4,12.66276 8.4,12 8.4,11.33724 7.862736,10.8 7.2,10.8 6.537264,10.8 6,11.33724 6,12 c 0,0.66276 0.537264,1.2 1.2,1.2 z m 6,-1.2 c 0,0.66276 -0.53724,1.2 -1.2,1.2 -0.66276,0 -1.2,-0.53724 -1.2,-1.2 0,-0.66276 0.53724,-1.2 1.2,-1.2 0.66276,0 1.2,0.53724 1.2,1.2 z m 3.6,1.2 c 0.66276,0 1.2,-0.53724 1.2,-1.2 0,-0.66276 -0.53724,-1.2 -1.2,-1.2 -0.66276,0 -1.2,0.53724 -1.2,1.2 0,0.66276 0.53724,1.2 1.2,1.2 z'
                                        ></path>
                                    </svg>
                                </span>
                                <input
                                    ref={passwRef}
                                    type='password'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base'
                                    placeholder='Your password'
                                    // defaultValue={'123456'}
                                    minLength={6}
                                    maxLength={16}
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <button
                                type='submit'
                                className='flex items-center justify-center gap-4 py-2 px-4 bg-slate-600 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg
                                        className='fill-slate-200 animate-spin'
                                        width='24px'
                                        height='24px'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M 23.962123,11.287285 C 23.749542,6.9492639 21.127711,2.8957026 17.230394,1.0467097 12.978775,-0.87339844 7.8059721,-0.09113214 4.2629564,2.8957026 0.86166141,5.7403069 -0.69726549,10.362789 0.29477891,14.700811 1.215963,18.967717 4.5463977,22.452357 8.7271561,23.590199 13.758239,25.012501 18.364159,22.594588 21.198571,18.469912 18.6476,21.883437 14.750283,24.159121 10.427804,23.376854 6.1053246,22.594588 2.5623089,19.323292 1.5702645,15.056386 0.50735981,10.505019 2.6331692,5.7403069 6.6722071,3.3935084 10.852966,0.97559456 16.734371,1.900091 19.497924,6.0247674 c 0.708603,0.9956116 1.204625,2.2045684 1.417206,3.4135253 0.212581,0.9956113 0.141721,2.0623383 0.283441,3.0579493 0.141721,0.924497 0.921184,2.133454 1.984089,1.493418 0.921184,-0.568921 0.850324,-1.777878 0.779463,-2.702375 0,-0.28446 0.07086,0.497806 0,0 z'></path>
                                    </svg>
                                ) : (
                                    <span>Login</span>
                                )}
                            </button>
                        </div>
                    </form>
                    <div className='flex items-center justify-center mt-6'>
                        <Link
                            to={'/register'}
                            className='inline-flex items-center text-xs font-thin text-center'
                        >
                            <span className='ml-2'>
                                You don&#x27;t have an account?
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
