import { useEffect, useState } from 'react';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import { capitalize } from 'lodash';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import { useVeterinarians } from '@/hooks/api/vet';
import AddVeterinaryModal from './add_supplier';
import UpdateVeterinarianModal from './update_supplier';
import ConfirmDeleteModal from './delete';
import { useSearchParams } from 'react-router-dom';
import { useSuppliers } from "@/hooks/api/suppliers";
import UpdateSupplierModal from "./update_supplier";
import AddSupplierModal from "./add_supplier";

const Suppliers = () => {
    const [searchParams] = useSearchParams();
    const { suppliers, loading, deleteSupplier,getSuppliers } :any= useSuppliers();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSuppplier, setSelectedSuppplier] = useState<any>({});

  console.log(suppliers)
    const handleDelete = async () => {
        try {
            await deleteSupplier(selectedSuppplier?.id);
            await getSuppliers()
        } catch (error) {
            toast.error('Failed to delete supplier');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleRefetch = () => {
        getSuppliers();
    };
    useEffect(() => {
        getSuppliers(searchParams)
    }, [searchParams])
    
    console.log(suppliers)
    const columns: TableColumnV2<any>[] = [
        {
            title: 'Full Name',
            accessor: 'name',
            render: row => <p>{row?.name}</p>,
        },
        
        {
            title: 'Email',
            accessor: 'email',
            render: row => <p>{row?.email}</p>,
        },
        {
            title: 'TIN',
            accessor: 'TIN',
            render: row => <p>{row?.TIN}</p>,
        },
        
        {
            title: 'Phone',
            accessor: 'phone',
            render: row => <p>{row?.phone}</p>,
        },
        {
            title: 'Actions',
            accessor: 'actions',
            render: row => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => {
                            setSelectedSuppplier(row);
                            setIsUpdateModalOpen(true);
                        }}
                        className=""
                    >
                        <IconEdit className="text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            setSelectedSuppplier(row);
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
                        Veterinarians
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
                    Add Supplier
                </button>
            </div>

            <AddSupplierModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={handleRefetch}
            />
            <UpdateSupplierModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                supplier={selectedSuppplier}
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
                    data={suppliers ?? []}
                    isLoading={loading}
                    currentPage={1}
                    total={1}
                    lastPage={1}
                    previousPage={1}
                    nextPage={1}
                    tableName={'Suppliers'}
                />
            </div>
        </div>
    );
};

export default Suppliers;
