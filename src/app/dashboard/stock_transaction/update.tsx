import { z } from 'zod';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/input';
import { useStockTransaction } from '@/hooks/api/stock_transactions';
import AppSelect from '@/components/select/SelectField';
import { useStock } from '@/hooks/api/stock';

const transactionSchema = z.object({
    stockId: z.string().nonempty('Stock ID is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    type: z.string().nonempty('Type is required'),
});

interface UpdateStockTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: any;
    handleRefetch: () => void;
}

const UpdateStockTransactionModal: React.FC<
    UpdateStockTransactionModalProps
> = ({ isOpen, onClose, transaction, handleRefetch }) => {
    const { updateTransaction, loading, error } = useStockTransaction();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: transaction,
    });

    useEffect(() => {
        if (!isOpen) {
            reset(transaction);
        }
    }, [isOpen, reset, transaction]);

    const onSubmit = async (data: any) => {
        try {
            await updateTransaction(transaction.id, data);
            onClose();
            handleRefetch();
        } catch (err) {}
    };
    const { stocks, getStock }: any = useStock();

    useEffect(() => {
        getStock();
    }, []);
    console.log(stocks)
    const options = stocks?.data?.map((stock: any) => ({
        value: stock.id,
        label: stock.name,
    }));


    return (
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" open={isOpen} onClose={onClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0" />
            </Transition.Child>
            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                <div className="flex items-start justify-center min-h-screen px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Update Stock Transaction
                                </Dialog.Title>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="mt-4"
                                >
                                    <AppSelect
                                        label="Stock ID"
                                        name="stockId"
                                        placeholder="Select Stock ID"
                                        options={options}
                                        defaultValue={ {
                                            label: `${transaction?.type} `,
                                            value: transaction?.id,
                                        }}
                                        error={errors.stockId?.message}
                                        register={register}
                                        setValue={setValue}
                                        validation={{
                                            required: 'Stock ID is required',
                                        }}
                                    />
                                    <InputField
                                        label="Quantity"
                                        placeholder="Inter quantity"
                                        type="number"
                                        defaultValue={transaction?.quantity}
                                        error={errors.quantity?.message}
                                        registration={register('quantity', {
                                            valueAsNumber: true,
                                        })}
                                        name={'quantity'}
                                    />
                                    <AppSelect
                                        label="Type"
                                        name="type"
                                        placeholder="Select Type"
                                        options={[
                                            { value: 'IN', label: 'In' },
                                            { value: 'OUT', label: 'Out' },
                                        ]}
                                        defaultValue={ {
                                            label: `${transaction?.type} `,
                                            value: transaction?.type,
                                        }}
                                        error={errors.type?.message}
                                        register={register}
                                        setValue={setValue}
                                        validation={{
                                            required: 'Type is required',
                                        }}
                                    />
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? 'Updating...' : 'Update'}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
    );
};

export default UpdateStockTransactionModal;
