import { useState } from "react";
import { toast } from "react-hot-toast";
import { api, queryString } from ".";

interface Item {
  name: string;
  unitPrice: number;
  categoryId: string;
  supplierId: string;
}

export const useItems = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState([]);
  const farmId = localStorage.getItem("FarmId");
  const getItems = async (query?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await api.get(
        `/items/farm/${farmId}?${queryString(query)}`
      );
      setItems(response?.data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching items.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (data: Item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/items/${farmId}`, data);
      toast.success("Item created successfully");
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while creating the item.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, data: Item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/items/${id}`, data);
      toast.success("item updated successfully");
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating the item.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/items/${id}`);
      toast.success("item deleted successfully");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the item.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    getItems,
    createItem,
    updateItem,
    deleteItem,
    loading,
    error,
  };
};
