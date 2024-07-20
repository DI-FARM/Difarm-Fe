import { useState } from 'react';
import DataTableV2, { TableColumnV2 } from '@/components/datatable';
import formatDateToLongForm from '@/utils/DateFormattter';
import { capitalize } from 'lodash';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from '@/components/Icon/IconTrash';
import { toast } from 'react-hot-toast';
import { useUsers } from '@/hooks/api/auth';
import AddUserModal from './add_user';
import UpdateUserModal from './update_user';
import ConfirmDeleteModal from './delete';


const Users = () => {
    const { users, loading, refetch, deleteUser }:any = useUsers();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>({});

    const handleDelete = async () => {
        try {
            await deleteUser(selectedUser?.id);
            toast.success('User deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete user');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleRefetch = () => {
        refetch();
    };

    const columns: TableColumnV2<any>[] = [
        {
            title: 'Full Name',
            accessor: 'fullName',
            render: row => <p>{row?.fullname}</p>,
        },
        {
            title: 'Username',
            accessor: 'username',
            render: row => <p>{row?.account.username}</p>,
        },
        {
            title: 'Email',
            accessor: 'email',
            render: row => <p>{row?.account.email}</p>,
        },
        {
            title: 'Gender',
            accessor: 'gender',
            render: row => <p>{capitalize(row?.gender)}</p>,
        },
        {
            title: 'Phone',
            accessor: 'phone',
            render: row => <p>{row?.account.phone}</p>,
        },
        {
            title: 'Actions',
            accessor: 'actions',
            render: row => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => {
                            setSelectedUser(row);
                            setIsUpdateModalOpen(true);
                        }}
                        className=""
                    >
                        <IconEdit className="text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            setSelectedUser(row);
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
                        Users
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
                    Add User
                </button>
            </div>

            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleRefetch={handleRefetch}
            />
            <UpdateUserModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                user={selectedUser}
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
                    data={users?.data ?? []}
                    total={users?.data?.length ?? 0}
                    lastPage={1}
                    isLoading={loading}
                    tableName={'Users'}
                />
            </div>
        </div>
    );
};

export default Users;
