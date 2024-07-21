import { useEffect, useState } from 'react';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import AddStockTransactionModal from './add';
import UpdateStockTransactionModal from './update';
import ConfirmDeleteModal from './delete';
import { useStockTransaction } from '@/hooks/api/stock_transactions';
import { get } from 'lodash';
import formatDateToLongForm from '@/utils/DateFormattter';


interface StockTransactionRecord {
    id: string;
    stockId: string;
    quantity: number;
    type: 'IN' | 'OUT';
    stock:any,

    date:string;
}

const StockTransactionManagement = () => {
    const { createTransaction, updateTransaction, deleteTransaction, loading, error,getStockTransactions,stock_transactions }:any = useStockTransaction();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<StockTransactionRecord | null>(null);

    useEffect(() => {
      getStockTransactions()
    }, [])
    
    const handleRefetch = () => {
        getStockTransactions()
    }
    const handleDelete = async () => {
        if (selectedTransaction) {
            try {
                await deleteTransaction(selectedTransaction.id);
           getStockTransactions()
            } catch (error) {
                toast.error('Failed to delete stock transaction');
            } finally {
                setIsDeleteModalOpen(false);
            }
        }
    };

    const columns: TableColumnV2<StockTransactionRecord>[] = [
        {
            title: 'Stock ',
            accessor: 'stock.name',
            render: row => <p>{row.stock.name}</p>,
        },
        {
            title: 'Total ',
            accessor: 'stock.quantity',
            render: row => <p>{row.stock.quantity}</p>,
        },
        {
            title: 'Quantity',
            accessor: 'quantity',
            render: row => <p>{row.quantity}</p>,
        },
        {
            title: 'Type',
            accessor: 'type',
            render: row => <p>{row.type}</p>,
        },
        {
            title: 'Date',
            accessor: 'date',
            render: row => <p>{formatDateToLongForm (row.date)}</p>,
        },
        {
            title: 'Actions',
            accessor: 'actions',
            render: row => (
                <div className="flex gap-2 justify-start">
                    <button
                        onClick={() => {
                            setSelectedTransaction(row);
                            setIsUpdateModalOpen(true);
                        }}
                        className=""
                    >
                        <IconEdit className='text-primary' />
                    </button>
                    <button
                        onClick={() => {
                            setSelectedTransaction(row);
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
                        Stock Transaction 
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
                    Add Transaction
                </button>
            </div>

            <AddStockTransactionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={handleRefetch}
            />
            <UpdateStockTransactionModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                transaction={selectedTransaction}
                handleRefetch={handleRefetch}
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
                    data={stock_transactions?.data?? []} 
                    total={stock_transactions?.data?.length ?? 0}
                    lastPage={1}
                    isLoading={loading}
                    tableName={'Stock Transactions'}
                />
            </div>
        </div>
    );
};

export default StockTransactionManagement;
