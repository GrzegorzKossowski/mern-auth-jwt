import App from './App';

interface AppWrapperProps {}

const AppWrapper = ({ ...restProps }: AppWrapperProps) => {
    return (
        <>
            <App />
        </>
    );
};

export default AppWrapper;
