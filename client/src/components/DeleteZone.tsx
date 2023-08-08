import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { useDeleteProfileMutation } from '../redux/slices/apiUserSlice';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../redux/slices/authSlice';

const DeleteZone = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // show delete info
    const [toDelete, setToDelete] = useState(false);
    // delete input state
    const [deleteInput, setDeleteInput] = useState('');
    // is ready to delete
    const [isDeletable, setIsDeletable] = useState(false);

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [deleteProfile, { isLoading }] = useDeleteProfileMutation();

    useEffect(() => {
        setIsDeletable(deleteInput === userInfo.name);
    }, [deleteInput]);

    const handleToDelete = useCallback(() => {
        setToDelete(prev => !prev);
    }, []);

    function deleteInputHandler(
        event: React.ChangeEvent<HTMLInputElement>
    ): void {
        setDeleteInput(event.target.value);
    }

    const handleDelete = useCallback(async () => {
        try {
            // wyślij strzał do backendu
            const { message } = await deleteProfile({
                _id: userInfo._id,
            }).unwrap();

            // wyczyść lokal
            dispatch(clearCredentials());
            // wystaw toast
            toast.success(message);
            // przekieruj na '/'
            navigate('/');
        } catch (error: any) {
            toast.error(
                `${error?.data?.message || error?.message || 'Error'}`,
                {
                    theme: 'light',
                }
            );
        }
    }, []);

    return (
        <>
            {toDelete ? (
                <div className='space-y-4'>
                    <p className='text-red-500 font-semibold'>
                        This is a danger zone. Are you sure to delete your
                        account?
                    </p>
                    <p>
                        Write your name{' '}
                        <span className='font-bold'>{userInfo.name}</span> below
                        to delete account
                    </p>
                    <input
                        value={deleteInput}
                        onChange={deleteInputHandler}
                        type='text'
                        className=' rounded-lg appearance-none border border-gray-300 w-full py-2 px-4 shadow-sm text-base '
                    />
                    <div className='flex space-x-4'>
                        <button
                            type='button'
                            className='flex items-center justify-center gap-4 py-2 px-4 bg-slate-600 text-white w-full rounded-lg '
                            onClick={handleToDelete}
                        >
                            <span>Cancel</span>
                        </button>
                        <button
                            type='button'
                            className='flex items-center justify-center gap-4 py-2 px-4 bg-red-600 text-white w-full rounded-lg disabled:bg-red-300'
                            onClick={handleDelete}
                            disabled={!isDeletable}
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
                                <span>Delete</span>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className='flex w-full'>
                    <button
                        type='button'
                        className='flex items-center justify-center gap-4 py-2 px-4 bg-red-600 text-white w-full rounded-lg '
                        onClick={handleToDelete}
                    >
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </>
    );
};

export default DeleteZone;
