import { useState } from 'react';

import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import formatDateToLongForm from '@/utils/DateFormattter';
import { capitalize } from 'lodash';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import { useCattle } from '@/hooks/api/cattle';
import AddCattleModal from './add_cattle';
import UpdateCattleModal from './update_cattle';
import ConfirmDeleteModal from './delete_cattle';

const CattleList = () => {
    const { cattle, loading, fetchCattle, deleteCattle }: any = useCattle();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCattle, setSelectedCattle] = useState<any>(null);

    const handleDelete = async () => {
        try {
            await deleteCattle(selectedCattle?.id);
            toast.success('Cattle deleted successfully');
            fetchCattle();
        } catch (error) {
            toast.error('Failed to delete cattle');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleRefetch = () => {
        fetchCattle();
    };

    const openUpdateModal = (row: any) => {
        setSelectedCattle(row);
        setIsUpdateModalOpen(true);
    };

    const openDeleteModal = (row: any) => {
        setSelectedCattle(row);
        setIsDeleteModalOpen(true);
    };

    const columns: TableColumnV2<any>[] = [
        {
            title: 'Tag Number',
            accessor: 'tagNumber',
            render: row => <p>{row?.tagNumber}</p>,
        },
        {
            title: 'Breed',
            accessor: 'breed',
            render: row => <p>{capitalize(row?.breed)}</p>,
        },
        {
            title: 'Gender',
            accessor: 'gender',
            render: row => <p>{capitalize(row?.gender)}</p>,
        },
        {
            title: 'Date of Birth',
            accessor: 'DOB',
            render: row => <p>{formatDateToLongForm(row?.DOB)}</p>,
        },
        {
            title: 'Weight(Kg)',
            accessor: 'weight',
            render: row => <p>{row?.weight}</p>,
        },
        {
            title: 'Location',
            accessor: 'location',
            render: row => <p>{capitalize(row?.location)}</p>,
        },
        {
            title: 'Farm ',
            accessor: 'farm.name',
            render: row => <p>{row?.farm.name}</p>,
        },
        {
            title: 'Last Checkup Date',
            accessor: 'lastCheckupDate',
            render: row => <p>{formatDateToLongForm(row?.lastCheckupDate)}</p>,
        },
        {
            title: 'Vaccine History',
            accessor: 'vaccineHistory',
            render: row => <p>{row?.vaccineHistory}</p>,
        },
        {
            title: 'Purchase Date',
            accessor: 'purchaseDate',
            render: row => <p>{formatDateToLongForm(row?.purchaseDate)}</p>,
        },
        {
            title: 'Price(RWF)',
            accessor: 'price',
            render: row => <p>{row?.price}</p>,
        },
        {
            title: 'Date Created',
            accessor: 'created_at',
            render: row => <p>{formatDateToLongForm(row?.createdAt)}</p>,
        },
        {
            title: 'Actions',
            accessor: 'actions',
            render: row => (
                <div className="flex gap-2 justify-center">
                    <button onClick={() => openUpdateModal(row)} className="">
                        <IconEdit className="text-primary" />
                    </button>
                    <button onClick={() => openDeleteModal(row)} className="">
                        <IconTrash className="text-danger" />
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
                        Cattle
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
                    Add Cattle
                </button>
            </div>

            <AddCattleModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={handleRefetch}
            />
            <UpdateCattleModal
                isOpen={isUpdateModalOpen}
                onClose={() => {
                    setSelectedCattle(null);
                    setIsUpdateModalOpen(false);
                }}
                cattle={selectedCattle}
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
                    data={cattle?.data ?? []}
                    total={cattle?.data?.length ?? 0}
                    lastPage={1}
                    isLoading={loading}
                    tableName={'Cattle'}
                />
            </div>
        </div>
    );
};

export default CattleList;
