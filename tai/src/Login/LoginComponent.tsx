import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import text from '../art_assets/partner.png';

const Login: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        navigate('/journal');
    };

    const toggleRegister = (): void => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className='font-vango w-3/4'>
            <div className="w-full bg-transparent rounded-lg dark:border dark:white dark:white justify-center">
                <div className="p-6 space-y-4 md:space-y-3 justify-center items-center flex flex-col">
                    <img
                        className="h-auto w-3/4 flex p-5"
                        src={text}
                        alt="Log In"
                    />
                    <form className="space-y-4 md:space-y-6 w-full" onSubmit={handleSubmit}>
                        {/* Email field */}
                        <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {/* SVG for Email */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <input type="email" name="email" id="email" placeholder="johndoe@bcg.org" required 
                                className="pl-10 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {/* Password field */}
                        <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {/* SVG for Password */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                            </div>
                            <input type="password" name="password" id="password" placeholder="Password" required 
                                className="pl-10 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {/* Conditional second password field for registration */}
                        {isRegistering && (
                            <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {/* Duplicate of SVG for Password Confirmation */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                    </svg>
                                </div>
                                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required 
                                    className="pl-10 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        )}

                        <div className="flex:grow flex flex-row items-center h-full justify-center">
                            <button type="submit" className="text-white text-base w-fit py-3 px-16 rounded-full bg-one hover:bg-two/[0.5] border-2 border-white">
                                {isRegistering ? 'Register' : 'Log in'}
                            </button>
                        </div>

                        {!isRegistering && (
                            <div className="flex:grow flex flex-row items-center h-full justify-center">
                                <button type="button" onClick={toggleRegister} className="text-white text-base w-fit py-3 px-16 rounded-full bg-two hover:bg-two/[0.8] border-white border-2 shadow-lg">
                                    Register
                                </button>
                            </div>
                        )}

                        {isRegistering && (
                            <div className="flex:grow flex flex-row items-center h-full justify-center">
                                <button type="button" onClick={toggleRegister} className="text-white text-base w-fit py-3 px-16 rounded-full bg-two hover:bg-two/[0.5] border-2 border-white">
                                    Back to Login
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;