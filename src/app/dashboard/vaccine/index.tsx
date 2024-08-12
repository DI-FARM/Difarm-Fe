import { useState, useEffect } from 'react';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import formatDateToLongForm from '@/utils/DateFormattter';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import { useVaccineRecords } from '@/hooks/api/vaccinr';
import AddVaccineRecordModal from './add_vaccine';
import UpdateVaccineModal from './update_vaccine';


const VaccineRecords = () => {
    const { vaccineRecords, loading, getVaccineRecords, deleteVaccineRecord }: any = useVaccineRecords();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>({});

    useEffect(() => {
        getVaccineRecords();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteVaccineRecord(selectedRecord?.id);
            toast.success('Vaccine record deleted successfully');
            getVaccineRecords();
        } catch (error) {
            toast.error('Failed to delete vaccine record');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleRefetch = () => {
        getVaccineRecords();
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
            title: 'Vaccine Type',
            accessor: 'vaccineType',
            render: row => <p>{row?.vaccineType}</p>,
        },
        {
            title: 'Veterinarian ID',
            accessor: 'vetId',
            render: row => <p>{row?.vetId}</p>,
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
                   
                </div>
            ),
        },
    ];

    console.log(vaccineRecords)
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
                        Vaccine Records
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
                    Add Vaccine Record
                </button>
            </div>

            <AddVaccineRecordModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={handleRefetch}
            />
            <UpdateVaccineModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                vaccine={selectedRecord}
                handleRefetch={handleRefetch}
            />
          

            <div className="w-full">
                <DataTableV2
                    columns={columns}
                    previousPage={0}
                    nextPage={0}
                    currentPage={1}
                    data={vaccineRecords?.data?.vaccinations ?? []}
                    total={vaccineRecords?.data?.totalPages ?? 0}
                    lastPage={1}
                    isLoading={loading}
                    tableName={'Vaccine Records'}
                />
            </div>
        </div>
    );
};

export default VaccineRecords;
