import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Menu from "./components/MenuPage/Menu";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginPage/Login";
import Footer from "./components/Footer/Footer";
import Cart from "./components/CartPage/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from './components/AuthProvider';
import { useAppDispatch } from './store/hooks';
import { fetchMenuItems } from './store/menuSlice';
import { useTheme} from "./ThemeContext";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { theme } = useTheme();

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
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/cart"
                            element={<ProtectedRoute element={<Cart />} />}
                        />
                    </Routes>
                </AuthProvider>
            </div>
            <Footer />
        </div>
    );
}

export default App;
