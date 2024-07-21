import { z } from 'zod';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from '@/components/input';
import { ProductionData } from '@/core';
import { useProduction } from '@/hooks/api/productions';
import AppSelect from '@/components/select/SelectField';

const productionSchema = z.object({
    cattleId: z.string().nonempty('Cattle ID is required'),
    productName: z.string().nonempty('Product Name is required'),
    quantity: z.string().min(1, 'Quantity must be at least 1'),
    productionDate: z.string().nonempty('Production Date is required'),
    expirationDate: z.string().nonempty('Expiration Date is required'),
});

interface UpdateProductionModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleRefetch: () => void;
    cattle: any;
    production: any;
}

const UpdateProduction: React.FC<UpdateProductionModalProps> = ({
    isOpen,
    onClose,
    handleRefetch,
    cattle,
    production,
}) => {
    const { updateProduction, loading, error } = useProduction();

    const {
        register,
        handleSubmit,
        control, 
        formState: { errors },
        reset,
        setValue, 
    } = useForm({
        resolver: zodResolver(productionSchema),
        defaultValues: {
            cattleId: production?.cattleId || '',
            productName: production?.productName || '',
            quantity: production?.quantity || '',
            productionDate: production?.productionDate
                ? new Date(production.productionDate)
                      .toISOString()
                      .split('T')[0]
                : '',
            expirationDate: production?.expirationDate
                ? new Date(production.expirationDate)
                      .toISOString()
                      .split('T')[0]
                : '',
        },
    });

    useEffect(() => {
        if (production) {
            reset({
                cattleId: production.cattleId || '',
                productName: production.productName || '',
                quantity: production.quantity || '',
                productionDate: production.productionDate
                    ? new Date(production.productionDate)
                          .toISOString()
                          .split('T')[0]
                    : '',
                expirationDate: production.expirationDate
                    ? new Date(production.expirationDate)
                          .toISOString()
                          .split('T')[0]
                    : '',
            });
            setValue('cattleId', production.cattleId || ''); // Set default value for cattleId
        }
    }, [production, reset, setValue]);

    const onSubmit = async (data: ProductionData) => {
        try {
            const payload = {
                ...data,
                quantity: parseFloat(data.quantity),
            };
            await updateProduction(production.id, payload);
            onClose();
            handleRefetch();
            reset();
        } catch (err) {
            console.error(err); // Log the error for debugging purposes
        }
    };

    // Prepare options for AppSelect
    const options = cattle?.data?.map((item: { id: string, tagNumber: string }) => ({
        label: item.tagNumber,
        value: item.id,
    })) || [];

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
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-xl my-8 text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <div className="font-bold text-lg">
                                        Update Production
                                    </div>
                                </div>
                                <div className="p-5">
                                    {error && (
                                        <div className="text-red-500">
                                            {error}
                                        </div>
                                    )}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="mb-4">
                                            <AppSelect
                                                    label="Cattle"
                                                    name="cattleId"
                                                    placeholder="Select Cattle"
                                                    options={options}
                                                    defaultValue={ {
                                                        label: `${production?.cattle.tagNumber}(${production?.cattle.breed}) `,
                                                        value: production?.cattle?.id,
                                                    }}
                                                    error={errors.cattleId?.message}
                                                    register={register}
                                                    setValue={setValue}
                                                    validation={{
                                                        required: 'Cattle is required',
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <InputField
                                                    type="text"
                                                    label="Product Name"
                                                    placeholder="Enter product name"
                                                    registration={register('productName')}
                                                    error={errors.productName?.message}
                                                    name="productName"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <InputField
                                                    type="number"
                                                    label="Quantity"
                                                    placeholder="Enter quantity"
                                                    registration={register('quantity')}
                                                    error={errors.quantity?.message}
                                                    name="quantity"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <InputField
                                                    type="date"
                                                    label="Production Date"
                                                    placeholder="Enter production date"
                                                    registration={register('productionDate')}
                                                    error={errors.productionDate?.message}
                                                    name="productionDate"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <InputField
                                                    type="date"
                                                    label="Expiration Date"
                                                    placeholder="Enter expiration date"
                                                    registration={register('expirationDate')}
                                                    error={errors.expirationDate?.message}
                                                    name="expirationDate"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="btn btn-outline-danger"
                                            >
                                                Discard
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                disabled={loading}
                                            >
                                                {loading ? 'Saving...' : 'Save'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateProduction;
