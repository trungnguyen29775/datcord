import { useContext, useEffect } from 'react';
import MainLayout from './layout/mainLayout/mainLayout';
import LogIn from './page/login/login';
import Register from './page/register/register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import StateContext from './context/context';

function App() {
    const [state, dispatchState] = useContext(StateContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(state);
        if (!state.login) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, [state]);
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<MainLayout />} />
        </Routes>
    );
}

export default App;
