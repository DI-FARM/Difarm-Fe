import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api, queryString } from '.';
import { storage } from '@/utils';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const baseURL = 'https://unipod.ur.ac.rw:4000';


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
 
    const token = storage.getToken();
    if (token) {
        const decodedToken: any = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            storage.removeToken();
            localStorage.removeItem('Farm_user');
            window.location.href = '/login';
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
    const farmId = localStorage.getItem('FarmId');
    const fetchUsers = async (query?:string) => {
        setLoading(true);
        try {
            const response = await api.get(`/users/${farmId}?${queryString(query)}`);
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
          toast.success('User Created successfully');
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            if (error.response.data.error) {
              const errorMessage = error.response.data.error.join(', ') ||error?.response?.data?.message;
              toast.error(errorMessage);
            } else if (error.response.data.message === 'An account with this phone address already exists.') {
              toast.error('An account with this phone number already exists.');
            } else {
              toast.error('Failed to create user. Please try again later.');
            }
          } else {
            toast.error('An unexpected error occurred. Please try again later.');
          }
          setError(error);
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