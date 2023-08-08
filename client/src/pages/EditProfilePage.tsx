import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../redux/slices/apiUserSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../redux/slices/authSlice';
import DeleteZone from '../components/DeleteZone';

export const Component = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // // show delete info
    // const [toDelete, setToDelete] = useState(false);
    // // delete input state
    // const [deleteInput, setDeleteInput] = useState('');
    // // is ready to delete
    // const [isDeletable, setIsDeletable] = useState(false);

    const [userFormData, setUserFormData] = useState<{
        name: string;
        email: string;
        password: string;
        confirm: string;
    }>({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    // useEffect(() => {
    //     setIsDeletable(deleteInput === userInfo.name);
    // }, [deleteInput]);

    useEffect(() => {
        if (userInfo) {
            setUserFormData({
                name: userInfo.name,
                email: userInfo.email,
                password: '',
                confirm: '',
            });
        }
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setUserFormData(prev => {
            return { ...prev, [event.target.name]: event.target.value };
        });
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            userFormData.password.trim().length !== 0 &&
            userFormData.password !== userFormData.confirm
        ) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const res = await updateProfile({
                _id: userInfo._id,
                email: userFormData.email,
                name: userFormData.name,
                password: userFormData.password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profile updated successfully');
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
            <div className='self-center border rounded-3xl p-4 shadow-md max-w-sm'>
                <div className='relative self-center mb-6 text-xl font-light text-center'>
                    <span>Edit your profile</span>
                    <Link
                        to={'/profile'}
                        className='absolute left-0 translate-y-0.5'
                    >
                        <svg
                            className='fill-slate-600'
                            width='24px'
                            height='24px'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='m 7.3614935,4.9226683 -6.242104,6.1892487 -0.05219,0.04843 c -0.208856,0.207108 -0.330372,0.48025 -0.348458,0.802971 l 0.0012,0.10849 c 0.01514,0.255637 0.112848,0.499857 0.30537,0.718703 l 0.07284,0.07518 6.263502,6.211637 c 0.463212,0.459331 1.212175,0.459331 1.675386,0 0.465985,-0.462078 0.465985,-1.21334 2.9e-5,-1.67538 l -4.32479,-4.289326 17.3818015,4.29e-4 c 0.654546,0 1.187178,-0.528169 1.187178,-1.182206 0,-0.654039 -0.532632,-1.182208 -1.18716,-1.182208 L 4.8518475,10.748213 9.0370355,6.5980854 c 0.465985,-0.4620778 0.465985,-1.2133399 0,-1.6754177 -0.463211,-0.4593311 -1.212174,-0.4593311 -1.675386,0 z'></path>
                        </svg>
                    </Link>
                </div>
                <div className='mt-8'>
                    <form
                        autoComplete='off'
                        onSubmit={submitHandler}
                        className='space-y-4'
                    >
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
                                    type='text'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 shadow-sm text-base '
                                    placeholder='Your name'
                                    minLength={3}
                                    maxLength={30}
                                    required
                                    value={userFormData.name}
                                    onChange={handleChange}
                                    name='name'
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
                                    type='email'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 shadow-sm text-base '
                                    placeholder='Your email'
                                    minLength={4}
                                    maxLength={50}
                                    required
                                    value={userFormData.email}
                                    onChange={handleChange}
                                    name='email'
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
                                    type='password'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base'
                                    placeholder='Your password'
                                    minLength={6}
                                    maxLength={16}
                                    value={userFormData.password}
                                    onChange={handleChange}
                                    name='password'
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
                                            fillRule='evenodd'
                                            d='M 1.405884,3.805884 C 0,5.21178 0,7.474512 0,12 0,16.52544 0,18.78828 1.405884,20.19408 2.81178,21.6 5.074512,21.6 9.6,21.6 h 4.8 c 4.52544,0 6.78828,0 8.19408,-1.40592 C 24,18.78828 24,16.52544 24,12 24,7.474512 24,5.21178 22.59408,3.805884 21.18828,2.4 18.92544,2.4 14.4,2.4 H 9.6 c -4.525488,0 -6.78822,0 -8.194116,1.405884 z M 7.2,13.2 C 7.862736,13.2 8.4,12.66276 8.4,12 8.4,11.33724 7.862736,10.8 7.2,10.8 6.537264,10.8 6,11.33724 6,12 c 0,0.66276 0.537264,1.2 1.2,1.2 z m 6,-1.2 c 0,0.66276 -0.53724,1.2 -1.2,1.2 -0.66276,0 -1.2,-0.53724 -1.2,-1.2 0,-0.66276 0.53724,-1.2 1.2,-1.2 0.66276,0 1.2,0.53724 1.2,1.2 z m 3.6,1.2 c 0.66276,0 1.2,-0.53724 1.2,-1.2 0,-0.66276 -0.53724,-1.2 -1.2,-1.2 -0.66276,0 -1.2,0.53724 -1.2,1.2 0,0.66276 0.53724,1.2 1.2,1.2 z'
                                        ></path>
                                    </svg>
                                </span>
                                <input
                                    type='password'
                                    className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base'
                                    placeholder='Confirm your password'
                                    minLength={6}
                                    maxLength={16}
                                    value={userFormData.confirm}
                                    onChange={handleChange}
                                    name='confirm'
                                />
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <button
                                type='submit'
                                className='flex items-center justify-center gap-4 py-2 px-4 bg-slate-600 text-white w-full rounded-lg '
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
                                    <span>Save</span>
                                )}
                            </button>
                        </div>
                    </form>
                    <div className='border-b-slate-500 border-b-[1px] my-8'>
                        {' '}
                    </div>
                    <DeleteZone/>
                </div>
            </div>
        </section>
    );
};
