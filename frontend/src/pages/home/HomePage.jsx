import React from 'react'
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { useAuthStore } from '../../store/AuthStore';

const HomePage = () => {
    const { user } = useAuthStore();
    return (
        // <div className='hero-bg h-screen'>
        (user ? <HomeScreen /> : <AuthScreen />)
        // </div>
    )
}

export default HomePage
