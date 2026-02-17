import React from 'react';
import './Login.css';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../../hooks/useLogin';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const {
        email,
        password,
        error,
        isRegistering,
        currentUser,
        setEmail,
        setPassword,
        setIsRegistering,
        handleLogin,
        handleRegister,
        handleLogout,
    } = useLogin();

    return (
        <div className='login'>
            {currentUser ? (
                <div>
                    <h1>{t('login.loggedIn')}</h1>
                    <p>{currentUser.email}</p>
                    <button onClick={handleLogout}>{t('login.logout')}</button>
                </div>
            ) : (
                <div>
                    <h1>{isRegistering ? t('login.titleRegister') : t('login.titleLogin')}</h1>
                    <div className='login__box'>
                        {error && <p className='error'>{error}</p>}
                        <div className='login__inputs'>
                            <label>{t('login.email')}</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='login__inputs'>
                            <label>{t('login.password')}</label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='login__buttons'>
                            {isRegistering ? (
                                <>
                                    <button className='login__submit' onClick={handleRegister}>
                                        {t('login.register')}
                                    </button>
                                    <button className='login__toggle' onClick={() => setIsRegistering(false)}>
                                        {t('login.toggleToLogin')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className='login__submit' onClick={handleLogin}>
                                        {t('login.submit')}
                                    </button>
                                    <button className='login__toggle' onClick={() => setIsRegistering(true)}>
                                        {t('login.toggleToRegister')}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
