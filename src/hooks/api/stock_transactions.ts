import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '.';

interface StockTransactionData {
    stockId: string;
    quantity: number;
    type: 'IN' | 'OUT'; 
}

export const useStockTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
const [stock_transactions, setStockTransactions] = useState([])
const getStockTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await api.get('/stock-transactions');
        setStockTransactions(response.data);
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message ||
            'An error occurred while fetching stock transactions.';
        toast.error(errorMessage);
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
}
const createTransaction = async (data: StockTransactionData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/stock-transactions', data);
            toast.success('Stock transaction created successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while creating the stock transaction.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateTransaction = async (id: string, data: StockTransactionData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/stock-transactions/${id}`, data);
            toast.success('Stock transaction updated successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while updating the stock transaction.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteTransaction = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/stock-transactions/${id}`);
            toast.success('Stock transaction deleted successfully');
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while deleting the stock transaction.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { stock_transactions, getStockTransactions,createTransaction, updateTransaction, deleteTransaction, loading, error };
};
