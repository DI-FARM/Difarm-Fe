import { useState } from "react";
import toast from "react-hot-toast";
import { api, queryString } from ".";
import { getFarmId } from "@/utils/farmId";

export const useCattle = () => {
  const [cattle, setCattle] = useState([]);
  const [allCattles, setallCattles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCattle = async (query: any) => {
    const farmId = getFarmId();
    if (!farmId) {
      setError("No farm selected. Choose a farm first.");
      return;
    }
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
  const fetchAllCattle = async () => {
    const farmId = getFarmId();
    if (!farmId) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/cattles/${farmId}?pageSize=500`);
      setallCattles(response.data);
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
    const farmId = getFarmId();
    if (!farmId) {
      toast.error("No farm selected. Choose a farm first.");
      return;
    }
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
    allCattles,
    loading,
    error,
    fetchCattle,
    fetchAllCattle,
    addCattle,
    updateCattle,
    deleteCattle,
  };
};
