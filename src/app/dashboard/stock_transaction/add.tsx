import { z } from 'zod';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/input';
import AppSelect from '@/components/select/SelectField';
import { useStockTransaction } from '@/hooks/api/stock_transactions';
import { useStock } from '@/hooks/api/stock';

const transactionSchema = z.object({
    stockId: z.string().nonempty('Stock ID is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    type: z
        .string().min(1, 'Type is required')
     
});

interface AddStockTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleRefetch: () => void;
}

const AddStockTransactionModal: React.FC<AddStockTransactionModalProps> = ({
    isOpen,
    onClose,
    handleRefetch,
}) => {
    const { createTransaction, loading, error } = useStockTransaction();
    const [stockOptions, setStockOptions] = useState<
        { value: string; label: string }[]
    >([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(transactionSchema),
    });

    const { stocks, getStock }: any = useStock();

    useEffect(() => {
        getStock();
    }, []);
    console.log(stocks)
    const options = stocks?.data?.map((stock: any) => ({
        value: stock.id,
        label: stock.name,
    }));

    const onSubmit = async (data: any) => {
        try {
            await createTransaction(data);
            onClose();
            handleRefetch();
        } catch (err) {}
    };

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
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left mt-4 align-middle transition-all transform bg-white shadow-xl rounded">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add Stock Transaction
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
                                        error={errors.stockId?.message}
                                        register={register}
                                        setValue={setValue}
                                        validation={{
                                            required: 'Stock ID is required',
                                        }}
                                    />
                                    <InputField
                                        label="Quantity"
                                        name="quantity"
                                        placeholder="Enter Quantity"
                                        type="number"
                                        error={errors.quantity?.message}
                                        registration={register('quantity', {
                                            valueAsNumber: true,
                                        })}
                                    />
                                    <AppSelect
                                        label="Type"
                                        name="type"
                                        placeholder="Select Type"
                                        options={[
                                            { value: 'ADDITION', label: 'In' },
                                            { value: 'SUBTRACTION', label: 'Out' },
                                        ]}
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
                                            className="btn btn-outline-danger"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? 'Adding...' : 'Add'}
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

export default AddStockTransactionModal;
