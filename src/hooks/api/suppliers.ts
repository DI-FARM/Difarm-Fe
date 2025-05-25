import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api, queryString } from '.';

interface SupplierData {
    name: string;
    TIN: number;
    phone: string;
    email: string;
}

export const useSuppliers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [suppliers, setSuppliers] = useState<any>([]);
    const farmId =  localStorage.getItem('FarmId') 
    const getSuppliers = async (query?:string) => {
        setLoading(true);
        setError(null);
        try {
            const response:any = await api.get(`/suppliers/farm/${farmId}?${queryString(query)}`);
            setSuppliers(response?.data.data);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred while fetching Suppliers.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const createSupplier = async (data: SupplierData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(`/suppliers/${farmId}`, data);
            toast.success('Suppliers created successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while creating the Supplier.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateSupplier = async (id: string, data: SupplierData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/suppliers/${id}`, data);
            toast.success('Supplier updated successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while updating the Supplier.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteSupplier = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/suppliers/${id}`);
            toast.success('Supplier deleted successfully');
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while deleting the Supplier.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { suppliers, getSuppliers, createSupplier, updateSupplier, deleteSupplier, loading, error };
};
