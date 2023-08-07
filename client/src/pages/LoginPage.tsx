import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Component = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = emailRef?.current?.value;
        const passwd = passwRef?.current?.value;

        console.log(email, passwd);
    }

    return (
        <section className='w-full h-screen flex justify-center'>
            <div className='self-center border rounded-3xl p-4 shadow-md'>
                <div className='self-center mb-6 text-xl font-light text-center'>
                    Login
                </div>
                <div className='mt-8'>
                    <form autoComplete='off' onSubmit={submitHandler}>
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
                                    defaultValue={'joht@doe.com'}
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
                                    defaultValue={'123456'}
                                />
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <button
                                type='submit'
                                className='py-2 px-4  bg-slate-600 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                            >
                                Login
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
