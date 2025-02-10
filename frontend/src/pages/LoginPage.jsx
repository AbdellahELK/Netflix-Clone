import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore.js'

const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useAuthStore();


  const HandleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    console.log({
      username: username,
      password: password,
    })
  }
  return (
    <>
      <div className='hero-bg h-screen w-full '>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
          <Link to={"/"}>
            <img src='/netflix-logo.png' alt='logo' className='w-52' />
          </Link>
        </header>
        <div className='flex justify-center items-center mt-18 mx-3'>
          <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
            <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>

            <form className='space-y-4' onSubmit={HandleSubmit}>
              <div>
                <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
                  Username
                </label>
                <input
                  type='text'
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                  placeholder='Jhon doe'
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                  id='username'
                />
              </div>
              <div>
                <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                  Password
                </label>
                <input
                  type='password'
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                  id='password'
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  placeholder='********'
                />
              </div>
              <button className='bg-red-700 text-white font-semibold rounded-md w-full px-3 py-2 hover:bg-red-800 '>Login</button>
            </form>
            <div className='text-gray-400 text-center'>
              You don't have an account? <Link to={'/signup'} className='text-red-600 hover:underline'>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
