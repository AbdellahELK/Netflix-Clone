import React from 'react'
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { useAuthStore } from '../../store/AuthStore';

const HomePage = () => {
    const { user } = useAuthStore();
    return (
        (user ? <HomeScreen /> : <AuthScreen />)
    )
}

export default HomePage
