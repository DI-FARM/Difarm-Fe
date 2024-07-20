import { useEffect, useState } from 'react';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import { useStock } from '@/hooks/api/stock';
import AddStockModal from './add_stock';
import UpdateStockModal from './update_stock';
import ConfirmDeleteModal from './delete';

interface StockRecord {
    id: string;
    name: string;
    quantity: number;
}

const StockManagement = () => {
    const { createStock, updateStock, deleteStock, loading, error ,getStock,stock}:any = useStock();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState<StockRecord | null>(null);

    const handleDelete = async () => {
        if (selectedStock) {
            try {
                await deleteStock(selectedStock.id);
                toast.success('Stock deleted successfully');
            } catch (error) {
                toast.error('Failed to delete stock');
            } finally {
                setIsDeleteModalOpen(false);
            }
        }
    };
    useEffect(() => {
    getStock()
    }, [])
    

    const columns: TableColumnV2<StockRecord>[] = [
        {
            title: 'Name',
            accessor: 'name',
            render: row => <p>{row.name}</p>,
        },
        {
            title: 'Quantity',
            accessor: 'quantity',
            render: row => <p>{row.quantity}</p>,
        },
        {
            title: 'Actions',
            accessor: 'actions',
            render: row => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => {
                            setSelectedStock(row);
                            setIsUpdateModalOpen(true);
                        }}
                        className=""
                    >
                        <IconEdit className='text-primary' />
                    </button>
                    <button
                        onClick={() => {
                            setSelectedStock(row);
                            setIsDeleteModalOpen(true);
                        }}
                        className=""
                    >
                        <IconTrash className='text-danger' />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark">
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                        Home
                    </button>
                </li>
                <li className="before:content-['/'] before:px-1.5">
                    <button className="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">
                        Stock Management
                    </button>
                </li>
            </ol>

            <div className="flex flex-row justify-end gap-2 mb-2">
                <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn btn-primary flex items-center gap-1"
                >
                    <IconPlus />
                    Add Stock
                </button>
            </div>

            <AddStockModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={() => {}}
            />
            <UpdateStockModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                stock={selectedStock}
                handleRefetch={() => {}}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />

            <div className="w-full">
                <DataTableV2
                    columns={columns}
                    previousPage={0}
                    nextPage={0}
                    currentPage={1}
                    data={stock?.data ?? []} // Replace with your data
                    total={stock?.data?.length ?? 0} // Replace with your total
                    lastPage={1}
                    isLoading={loading}
                    tableName={'Stock'}
                />
            </div>
        </div>
    );
};

export default StockManagement;
