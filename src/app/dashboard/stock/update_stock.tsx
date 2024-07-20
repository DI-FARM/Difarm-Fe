import { z } from 'zod';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/input';
import { useStock } from '@/hooks/api/stock';

const stockSchema = z.object({
    name: z.string().nonempty('Name is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
});

interface UpdateStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    stock: any;
    handleRefetch: () => void;
}

const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
    isOpen,
    onClose,
    stock,
    handleRefetch,
}) => {
    const { updateStock, loading, error } = useStock();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(stockSchema),
        defaultValues: stock,
    });

    useEffect(() => {
        if (!isOpen) {
            reset(stock);
        }
    }, [isOpen, reset, stock]);

    const onSubmit = async (data: any) => {
        try {
            await updateStock(stock.id, data);
            onClose();
            handleRefetch();
        } catch (err) {}
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Update Stock
                                </Dialog.Title>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="mt-4"
                                >
                                    <InputField
                                        label="Name"
                                        placeholder="Enter stock name"
                                        error={errors.name?.message}
                                        registration={register('name')}
                                        type={'text'}
                                        name={'name'}
                                    />
                                    <InputField
                                        label="Quantity"
                                        placeholder="Enter stock quantity"
                                        name="quantity"
                                        type="number"
                                        error={errors.quantity?.message}
                                        registration={register('quantity')}
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

export default UpdateStockModal;
