import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '.';
import { storage } from '@/utils';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const baseURL = process.env.REACT_APP_SERVER_URL;

export const useLogin = () => {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const login = async (credentials: {
        username: string;
        password: string;
    }) => {
        setLoadingLogin(true);
        setLoginError(null);
        try {
            const response = await api.post(`/auth/login`, credentials);
            const { token, userFound } = response.data.user;
            storage.setToken(token);
            localStorage.setItem('Farm_user', JSON.stringify(userFound));
            setLoginSuccess(true);
            toast.success(`Login successful! Welcome ${userFound.username}`);
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred during login.';
            toast.error(errorMessage);
            setLoginError(errorMessage);
        } finally {
            setLoadingLogin(false);
        }
    };

    return {
        loadingLogin,
        login,
        loginSuccess,
        loginError,
    };
};

export const isLoggedIn = () => {
    const navigate = useNavigate();

    const token = storage.getToken();
    if (token) {
        const decodedToken: any = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            storage.removeToken();
            localStorage.removeItem('Farm_user');
            navigate('/login');
            return false;
        }

        const user = localStorage.getItem('Farm_user');
        if (user) {
            return JSON.parse(user);
        }
    }
    return false;
};

export const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/auth/users`);
            setUsers(response.data);
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while fetching users.';
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        users,
        loading,
        error,
        fetchUsers,
    };
};


export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/auth/users');
            setUsers(response.data);
       
        } catch (error:any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (user: any) => {
        setLoading(true);
        try {
            await api.post('/auth/signup', user);
            fetchUsers();
            toast.success('Users Created successfully');
        } catch (error:any) {
            setError(error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id: any, user: any) => {
        setLoading(true);
        try {
            await api.put(`/users/${id}`, user);
            fetchUsers();
        } catch (error:any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id: any) => {
        setLoading(true);
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (error:any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        loading,
        error,
        addUser,
        updateUser,
        deleteUser,
        refetch: fetchUsers,
    };
};