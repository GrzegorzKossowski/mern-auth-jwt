import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);
    const confRef = useRef<HTMLInputElement>(null);

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = emailRef?.current?.value;
        const passwd = passwRef?.current?.value;
        console.log(email, passwd);

        // if (password !== confirmPassword) {
        //     toast.error('Passwords do not match');
        // } else {
        //     try {
        //         const res = await register({ name, email, password }).unwrap();
        //         dispatch(setCredentials({ ...res }));
        //         navigate('/');
        //     } catch (err) {
        //         toast.error(err?.data?.message || err.error);
        //     }
        // }
    }

    return (
        <section className='w-full h-screen flex justify-center'>
            <div className='self-center border rounded-3xl p-4 shadow-md'>
                <div className='self-center mb-6 text-xl font-light text-center'>
                    Register
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
                                        viewBox='0 0 32 32'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z' />
                                    </svg>
                                </span>
                                <input
                                    ref={nameRef}
                                    type='text'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 shadow-sm text-base '
                                    placeholder='Your name'
                                />
                            </div>
                        </div>
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
                                />
                            </div>
                        </div>
                        <div className='flex flex-col mb-2'>
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
                                            d='M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8Z'
                                            fillRule='evenodd'
                                        />
                                    </svg>
                                </span>
                                <input
                                    ref={passwRef}
                                    type='password'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base'
                                    placeholder='Your password'
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
                                    ref={confRef}
                                    type='password'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base'
                                    placeholder='Repeat password'
                                />
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <button
                                type='submit'
                                className='py-2 px-4  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md border rounded-xl border-slate-300 hover:bg-slate-600 hover:text-slate-200'
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
                <div className='flex items-center justify-center mt-6'>
                    <Link
                        to={'/login'}
                        className='inline-flex items-center text-xs font-thin text-center'
                    >
                        Already have an account?
                    </Link>
                </div>
            </div>
        </section>
    );
};
