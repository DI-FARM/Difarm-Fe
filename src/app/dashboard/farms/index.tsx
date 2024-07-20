import { useDeleteFarm, useFarms } from '@/hooks/api/farms';
import { useState } from 'react';
import AddFarmModal from './add_farm';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import formatDateToLongForm from '@/utils/DateFormattter';
import { capitalize } from 'lodash';
import IconPlus from '@/components/Icon/IconPlus';
import IconRefresh from '@/components/Icon/IconRefresh';
import IconHome from '@/components/Icon/IconHome';
import UpdateFarmModal from './update';
import IconTrash from '@/components/Icon/IconTrash';
import IconPencil from '@/components/Icon/IconPencil';
import ConfirmDeleteModal from './delete';


const FarmsList = () => {
    const { farms, loading, error, refetch }: any = useFarms();
   
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDketeModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedFarm, setSelectedFarm] = useState<any>(null);

    const columns: TableColumnV2<any>[] = [
        {
            title: 'Name',
            accessor: 'name',
            render: row => <p className="capitalize">{row?.name}</p>,
        },
        {
            title: 'Location',
            accessor: 'location',
            render: row => <p className="capitalize">{row?.location}</p>,
        },
        {
            title: 'Size',
            accessor: 'size',
            render: row => <p>{capitalize(row?.size)}</p>,
        },
        {
            title: 'Type',
            accessor: 'type',
            render: row => <p>{capitalize(row?.type)}</p>,
        },
        {
            title: 'Owner  name',
            accessor: 'owner.name',
            render: row => <p>{capitalize(row?.owner.fullname)}</p>,
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
                    <button
                        onClick={() => {
                            setSelectedFarm(row);
                            setIsUpdateModalOpen(true);
                        }}
                        className=""
                    >
                        <IconPencil/>
                    </button>
                    <button
                        onClick={ () => {
                            setSelectedFarm(row);
                            setIsDeleteModalOpen(true);
                        }}
                        className=""
                        
                    >
                        <IconTrash/>
                    </button>
                </div>
            ),
        },
    ];

    const handleRefetch = () => {
        refetch();
    };

    return (
        <div className="">
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark">
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                        <IconHome />
                    </button>
                </li>
                <li className="before:content-['/'] before:px-1.5">
                    <button className="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">
                        Farms
                    </button>
                </li>
            </ol>

            <div className="flex flex-row justify-end gap-2 mb-2">
                <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn btn-primary"
                >
                    <IconPlus />
                    Add Farm
                </button>
            </div>

            <AddFarmModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={handleRefetch}
            />

            <UpdateFarmModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                farm={selectedFarm}
                handleRefetch={handleRefetch}
            />
             <ConfirmDeleteModal
                isOpen={isDketeModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                farm={selectedFarm}
                handleRefetch={handleRefetch}
            />

            <div className="w-full">
                <DataTableV2
                    columns={columns}
                    previousPage={0}
                    nextPage={0}
                    currentPage={1}
                    data={farms?.data ?? []}
                    total={farms?.data?.length ?? 0}
                    lastPage={1}
                    isLoading={loading}
                    tableName={'Farms'}
                />
            </div>
        </div>
    );
};

export default FarmsList;
