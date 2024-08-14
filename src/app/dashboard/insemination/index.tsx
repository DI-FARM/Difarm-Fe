import { useState, useEffect } from 'react';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import formatDateToLongForm from '@/utils/DateFormattter';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import { useInseminationRecords } from '@/hooks/api/insemination';
import AddInseminationRecordModal from './add_inse';
import UpdateInseminationModal from './update_inse';

const InseminationRecords = () => {
    const { inseminationRecords, loading, fetchInseminationRecords, deleteInseminationRecord }: any = useInseminationRecords();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>({});

    useEffect(() => {
        fetchInseminationRecords();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteInseminationRecord(selectedRecord?.id);
            toast.success('Insemination record deleted successfully');
            fetchInseminationRecords();
        } catch (error) {
            toast.error('Failed to delete insemination record');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleRefetch = () => {
        fetchInseminationRecords();
    };

    const columns: TableColumnV2<any>[] = [
        {
            title: 'Cattle ',
            accessor: 'cattle.tagNumber',
            render: row => <p>{row?.cattle.breed}({row?.cattle.tagNumber})</p>,
        },
        {
            title: 'Date',
            accessor: 'date',
            render: row => <p>{formatDateToLongForm(row?.date)}</p>,
        },
        {
            title: 'Method',
            accessor: 'method',
            render: row => <p>{row?.method}</p>,
        },
        {
            title: 'Type',
            accessor: 'type',
            render: row => <p>{row?.type}</p>,
        },
        {
            title: 'Veterinarian ',
            accessor: 'vet.name',
            render: row => <p>{row?.veterinarian?.name}</p>,
        },
        {
            title: 'Veterinarian Email',
            accessor: 'vet.email',
            render: row => <p>{row?.veterinarian?.email}</p>,
        },
        {
            title: 'Actions',
            accessor: 'actions',
            render: row => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => {
                            setSelectedRecord(row);
                            setIsUpdateModalOpen(true);
                        }}
                        className=""
                    >
                        <IconEdit className="text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            setSelectedRecord(row);
                            setIsDeleteModalOpen(true);
                        }}
                        className=""
                    >
                        <IconTrash className="text-danger" />
                    </button>
                </div>
            ),
        },
    ];
    console.log(inseminationRecords)

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
                        Insemination Records
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
                    Add Insemination Record
                </button>
            </div>

            <AddInseminationRecordModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={handleRefetch}
            />
            <UpdateInseminationModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                insemination={selectedRecord}
                handleRefetch={handleRefetch}
            />

            <div className="w-full">
                <DataTableV2
                    columns={columns}
                    previousPage={0}
                    nextPage={0}
                    currentPage={1}
                    data={inseminationRecords?.data?.inseminations ?? []}
                    total={inseminationRecords?.data?.length ?? 0}
                    lastPage={1}
                    isLoading={loading}
                    tableName={'Insemination Records'}
                />
            </div>
        </div>
    );
};

export default InseminationRecords