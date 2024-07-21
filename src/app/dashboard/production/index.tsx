import { useEffect, useState } from 'react';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import { capitalize } from 'lodash';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import AddProductionModal from './create_prod';
import UpdateProduction from './update_prod';
import { useCattle } from '@/hooks/api/cattle';
import { useProduction } from '@/hooks/api/productions';
import formatDateToLongForm from '@/utils/DateFormattter';
import ConfirmDeleteModal from './delete';


interface ProductionRecord {
    id: string;
    cattleId: string;
    productName: string;
    quantity: number;
    productionDate: string;
    expirationDate: string;
    cattle:any
}

const Production = () => {
    const { cattle, loading: cattleLoading } = useCattle();
    const { createProduction, updateProduction, deleteProduction, loading, error,getProductions ,productions}:any = useProduction();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduction, setSelectedProduction] = useState<ProductionRecord | null>(null);

    useEffect(() => {
        getProductions();
    },[])
    const handleDelete = async () => {
        if (selectedProduction) {
            try {
                await deleteProduction(selectedProduction.id);
               
                getProductions();
            } catch (error) {
                toast.error('Failed to delete production');
            } finally {
                setIsDeleteModalOpen(false);
            }
        }
    };

    const handleRefetch = () => {
        getProductions()
    }
    const columns: TableColumnV2<ProductionRecord>[] = [
        {
            title: 'Cattle Tag',
            accessor: 'cattle.tagNumber',
            render: row => <p>{row.cattle.tagNumber}</p>,
        },
        {
            title: 'Cattle Breed ',
            accessor: 'cattle.breed',
            render: row => <p>{row.cattle.breed}</p>,
        },
        {
            title: 'Product Name',
            accessor: 'productName',
            render: row => <p>{row.productName}</p>,
        },
        {
            title: 'Quantity',
            accessor: 'quantity',
            render: row => <p>{row.quantity}</p>,
        },
        {
            title: 'Production Date',
            accessor: 'productionDate',
            render: row => <p> {formatDateToLongForm(row.productionDate)}</p>,
        },
        {
            title: 'Expiration Date',
            accessor: 'expirationDate',
            render: row => <p>{formatDateToLongForm(row.expirationDate)}</p>,
        },
        {
            title: 'Actions',
            accessor: 'actions',
            render: row => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => {
                            setSelectedProduction(row);
                            setIsUpdateModalOpen(true);
                        }}
                        className=""
                    >
                        <IconEdit className='text-primary' />
                    </button>
                    <button
                        onClick={() => {
                            setSelectedProduction(row);
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
                    Add Production
                </button>
            </div>

            <AddProductionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={handleRefetch}
                cattle={cattle}
            />
            <UpdateProduction
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                production={selectedProduction}
                handleRefetch={handleRefetch}
                cattle={cattle}
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
                    data={productions?.data} 
                    total={productions?.length ?? 0} 
                    lastPage={1}
                    isLoading={loading || cattleLoading}
                    tableName={'Production'}
                />
            </div>
        </div>
    );
};

export default Production;
