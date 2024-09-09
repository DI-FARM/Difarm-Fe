import { useState } from "react";
import toast from "react-hot-toast";
import { api, queryString } from ".";

export const useCattle = () => {
  const [cattle, setCattle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const farmId = localStorage.getItem("FarmId");

  const fetchCattle = async (query: any) => {
    setLoading(true);
    setError(null);

    try {
     
      const response = await api.get(`/cattles/${farmId}?${queryString(query)}`);
      setCattle(response.data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching cattle.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addCattle = async (cattleData: any) => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/cattles/${farmId}`, cattleData);
      toast.success("Cattle added successfully");
      fetchCattle({});
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while adding cattle.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateCattle = async (id: number, cattleData: any) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/cattles/${id}`, cattleData);
      toast.success("Cattle updated successfully");
      fetchCattle({});
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating cattle.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteCattle = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/cattles/${id}`);
      toast.success("Cattle deleted successfully");
      fetchCattle({});
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting cattle.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    cattle,
    loading,
    error,
    fetchCattle,
    addCattle,
    updateCattle,
    deleteCattle,
  };
};
