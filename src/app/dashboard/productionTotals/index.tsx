import { useEffect, useState } from 'react';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import { useStockTransaction } from '@/hooks/api/stock_transactions';
import { get } from 'lodash';
import formatDateToLongForm from '@/utils/DateFormattter';
import AddStockTransactionModal from '../stock_transaction/add';
import { useProductionTransaction } from '@/hooks/api/production_totals';
import UpdateProductionTransactionModal from './updatePrice';

const ProductionTotals = () => {
    const {
        production_transactions, 
        getProductionTransactions,
        loading, 
    }: any = useProductionTransaction();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
        useState<any | null>(null);

    useEffect(() => {
        getProductionTransactions();
    }, []);

    const handleRefetch = () => {
        getProductionTransactions();
    };

    const columns: TableColumnV2<any>[] = [
        {
            title: 'Product Type',
            accessor: 'productType',
            render: row => <p>{row.productType}</p>,
        },
        {
            title: 'Quantity (kg or Litres)',
            accessor: 'totalQuantity',
            render: row => <p>{row.totalQuantity}</p>,
        },
        {
            title: 'Price ',
            accessor: 'pricePerUnit',
            render: row => <p>{row.pricePerUnit}</p>,
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
                        <IconEdit className="text-primary" />
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
                        Production
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

           
            <UpdateProductionTransactionModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                transaction={selectedTransaction}
                handleRefetch={handleRefetch}
            />

            <div className="w-full">
                <DataTableV2
                    columns={columns}
                    previousPage={0}
                    nextPage={0}
                    currentPage={1}
                    data={production_transactions?.data ?? []}
                    total={production_transactions?.data?.length ?? 0}
                    lastPage={1}
                    isLoading={loading}
                    tableName={'Production Totals'}
                />
            </div>
        </div>
    );
};

export default ProductionTotals;
