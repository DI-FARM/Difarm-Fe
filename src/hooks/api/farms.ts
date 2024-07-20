import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { api } from '.';
import toast from 'react-hot-toast';

export const useFarms = () => {
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFarms = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/farms');
            setFarms(response.data);
        } catch (error:any) {
            setError(error.response?.data?.message || 'An error occurred while fetching farms.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFarms();
    }, [fetchFarms]);

    return {
        farms,
        loading,
        error,
        fetchFarms
    };
};



const useAddFarm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addFarm = async (farmData:any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/farms', farmData);
            return response.data;
            toast.success('Farm added successfully!');
        } catch (err:any) {
            setError(err.response?.data?.message || 'An error occurred while adding the farm.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, addFarm };
};

export default useAddFarm;

export const useUpdateFarm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateFarm = async (id: string, updatedData: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/farms/${id}`, updatedData);
            toast.success('Farm updated successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while updating the farm.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { updateFarm, loading, error };
};


export const useDeleteFarm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteFarm = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/farms/${id}`);
            toast.success("Farm deleted successfully");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "An error occurred while deleting the farm.";
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { deleteFarm, loading, error };
};
