import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Menu from "./components/MenuPage/Menu";
import Login from "./components/LoginPage/Login";
import Cart from "./components/CartPage/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from './components/AuthProvider';
import { useAppDispatch } from './store/hooks';
import { fetchMenuItems } from './store/menuSlice';
import { useTheme} from "./ThemeContext";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        dispatch(fetchMenuItems());
    }, [dispatch]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className='app-wrapper'>
            <Header />
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/" element={<Navigate to="/menu" replace />} />
                    <Route path="/menu" element={<ProtectedRoute element={<Menu />} />} />
                    <Route
                        path="/login"
                        element={isAuthenticated() ? <Navigate to="/menu" replace /> : <Login />}
                    />
                    <Route
                        path="/cart"
                        element={<ProtectedRoute element={<Cart />} />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
