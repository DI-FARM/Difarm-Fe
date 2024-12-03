import { z } from 'zod';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/input';
import { useVaccineRecords } from '@/hooks/api/vaccinr';
import AppSelect from '@/components/select/SelectField';
import { useCattle } from '@/hooks/api/cattle';
import { useVeterinarians } from '@/hooks/api/vet';

const vaccineSchema = z.object({
    cattleId: z.string().nonempty('Cattle ID is required'),
    vaccineType: z.string().nonempty('Vaccine type is required'),
    price: z.number().min(0.01, 'Price must be at least 0.01'),
    vetId: z.string().nonempty('Vet ID is required'),
    date: z.string().nonempty('Date is required'),
});

const UpdateVaccineModal = ({
    isOpen,
    onClose,
    vaccine,
    handleRefetch,
}: any) => {
    const { updateVaccineRecord, loading, error } = useVaccineRecords();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(vaccineSchema),
        defaultValues: vaccine,
    });

    useEffect(() => {
        reset(vaccine);
    }, [vaccine, reset]);

    const onSubmit = async (data: any) => {
        try {
            await updateVaccineRecord(vaccine.id, data);
            onClose();
            handleRefetch();
            reset();
        } catch (err) {}
    };
    const { cattle, fetchCattle }: any = useCattle();
    const { veterinarians, getVeterinarians }: any = useVeterinarians();
    useEffect(() => {
        fetchCattle('pageSize=20000000');
        getVeterinarians('pageSize=1000000');
    }, []);

    const cattleOptions = cattle?.data?.data
    ?.filter((item: any) => item.status !== 'SOLD' && item.status !== 'PROCESSED')
    .map((item: any) => ({
      value: item.id,
      label: item.tagNumber,
    }));
  
    const vetOptions = veterinarians?.data?.data.map((item: any) => ({
        value: item.id,
        label: `${item.name}`,
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
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-xl my-8 text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <div className="font-bold text-lg">
                                        Update Vaccine
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
                                                    label="Cattle "
                                                    name="cattleId"
                                                    placeholder="Select Cattle "
                                                    options={cattleOptions}
                                                    error={
                                                        errors.cattleId?.message
                                                    }
                                                    defaultValue={{
                                                        label: `${vaccine?.cattle?.tagNumber}(${vaccine?.cattle?.breed}) `,
                                                        value: vaccine?.cattle?.id,
                                                    }}
                                                    register={register}
                                                    setValue={setValue}
                                                    validation={{
                                                        required:
                                                            'Cattle  is required',
                                                    }}
                                                />
                                            </div>
                                           
                                            <div className="mb-4">
                                                <InputField
                                                    type="text"
                                                    label="Vaccine Type"
                                                    defaultValue={
                                                        vaccine?.vaccineType
                                                    }
                                                    placeholder="Enter vaccine type"
                                                    registration={register(
                                                        'vaccineType'
                                                    )}
                                                    error={
                                                        errors.vaccineType
                                                            ?.message
                                                    }
                                                    name="vaccineType"
                                                />
                                            </div>
                                            <div>
                                            <InputField
                                        
                                        label="Vaccine price"
                                        name="price"
                                        placeholder="Enter Price"
                                        type="number"
                                        defaultValue={
                                            vaccine?.price
                                        }
                                        error={errors.price?.message}
                                        registration={register('price', {
                                            valueAsNumber: true,
                                        })}
                                    />
                                            </div>
                                            <div className="mb-4">
                                                <AppSelect
                                                    label="Veterinarian"
                                                    name="vetId"
                                                    placeholder="Select Veterinarian"
                                                    options={vetOptions}
                                                    error={
                                                        errors.vetId?.message
                                                    }
                                                    defaultValue={{
                                                        label: `${vaccine?.veterinarian?.name} `,
                                                        value: vaccine?.veterinarian?.id,
                                                    }}
                                                    register={register}
                                                    setValue={setValue}
                                                    validation={{
                                                        required:
                                                            'Veterinarian  is required',
                                                    }}
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

export default UpdateVaccineModal;
