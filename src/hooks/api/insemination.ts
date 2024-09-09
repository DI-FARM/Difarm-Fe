import { useState } from 'react';
import axios from 'axios';
import { api, queryString } from '.';

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

    const fetchInseminationRecords = async (query?:string) => {
        setLoading(true);
        try {
            const response = await api.get(`/inserminations/${farmId}?${queryString(query)}`);
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
