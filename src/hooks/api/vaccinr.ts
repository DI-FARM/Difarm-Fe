import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '.';

interface VaccineData {
    cattleId: string;
    date: string;
    vaccineType: string;
    vetId: string;
}

export const useVaccineRecords = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [vaccineRecords, setVaccineRecords] = useState([]);
    const farmId = localStorage.getItem('FarmId');
    const getVaccineRecords = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: any = await api.get(`/vaccinations/${farmId}`);
            setVaccineRecords(response?.data);
            console.log(response?.data)
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred while fetching vaccine records.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const createVaccineRecord = async (data: VaccineData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post( `/vaccinations`, data);
            toast.success('Vaccine record created successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while creating the vaccine record.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateVaccineRecord = async (id: string, data: VaccineData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/vaccinations/${id}`, data);
            toast.success('Vaccine record updated successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while updating the vaccine record.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteVaccineRecord = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/vaccinations/${id}`);
            toast.success('Vaccine record deleted successfully');
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while deleting the vaccine record.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { vaccineRecords, getVaccineRecords, createVaccineRecord, updateVaccineRecord, deleteVaccineRecord, loading, error };
};
