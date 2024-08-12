import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '@/components/input';
import Logo from '@/assets/logo.png';
import img2 from '@/assets/istockphoto-2151351987-2048x2048-Photoroom.png';
import { useLogin } from '@/hooks/api/auth';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { loadingLogin, login } = useLogin();
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await login(credentials);
        if (response) {
            navigate('/choose-farm');
        } 
    };

    return (
        <div className="bg-white dark:bg-black min-h-screen grid sm:grid-cols-2 grid-cols-1 ">
            <div className="flex justify-center items-center">
                <div className="max-w-md w-full space-y-8 p-2">
                    <div className="text-center">
                        <img src={Logo} alt="Farm Logo" className="w-32 mx-auto" />
                        <h2 className="mt-6 text-3xl font-extrabold text-primary dark:text-white">
                            Welcome back, Login
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <InputField
                            type="text"
                            name="username"
                            label="Username"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="h-13"
                            required
                        />
                        <InputField
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="h-13"
                            required
                        />
                        <div className="flex items-center justify-between">
                            <Link to="/reset-password" className="text-sm font-medium text-teal-600 hover:text-teal-500">
                                Forgot your password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            disabled={loadingLogin}
                        >
                            {loadingLogin ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="bg-cover h-full" style={{ backgroundImage: `url(${img2})` }}>
                <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
                    <div>
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            Welcome to Farm
                        </h2>
                        <p className="mt-3 max-w-2xl text-2xl text-gray-300">
                            Bringing you closer to nature.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
