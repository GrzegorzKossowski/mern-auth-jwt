/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface ErrorPageProps {}

const ErrorPage = ({ ...restProps }: ErrorPageProps) => {
    const error = useRouteError();
    const { status, statusText }: any = error;
    console.log(error);

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    alignSelf: 'center',
                }}
            >
                <div>
                    <span style={{ fontWeight: 'bolder' }}>{status}</span> |{' '}
                    {statusText || 'Some error'} [
                    <Link className='text-xl' to='/'>E.T. go home... 🛸</Link>]
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
