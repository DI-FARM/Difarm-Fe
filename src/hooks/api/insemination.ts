import { useState } from 'react';
import axios from 'axios';
import { api } from '.';
import InseminationRecords from '@/app/dashboard/insemination';

export const useInseminationRecords = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const farmId = localStorage.getItem('FarmId');
    const [inseminationRecords, setInseminationRecords] = useState<any>([]);
    const createInseminationRecord = async (data: any) => {
        setLoading(true);
        try {
            await api.post(`/inserminations`, data);
            setLoading(false);
        } catch (err:any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchInseminationRecords = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/inserminations/${farmId}`);
            setLoading(false);
            setInseminationRecords(response.data)
            return response.data;

        } catch (err:any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const updateInseminationRecord = async (id: string, data: any) => {
        setLoading(true);
        try {
            await api.put(`/inserminations/${id}`, data);
            setLoading(false);
        } catch (err:any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return { createInseminationRecord, fetchInseminationRecords, updateInseminationRecord, loading, error,inseminationRecords };
};