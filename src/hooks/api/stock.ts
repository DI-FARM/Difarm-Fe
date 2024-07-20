import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '.';

interface StockData {
    name: string;
    quantity: number;
}

export const useStock = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
const [stock,setStock]= useState([])
const getStock = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await api.get('/stocks');
        setStock(response.data);
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching stocks.';
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
}
    const createStock = async (data: StockData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/stocks', data);
            toast.success('Stock created successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while creating the stock.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateStock = async (id: string, data: StockData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/stocks/${id}`, data);
            toast.success('Stock updated successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while updating the stock.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteStock = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/stocks/${id}`);
            toast.success('Stock deleted successfully');
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while deleting the stock.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { stock,createStock, updateStock, deleteStock, loading, error,getStock };
};
