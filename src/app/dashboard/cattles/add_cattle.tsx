import { z } from 'zod';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/input';
import { useCattle } from '@/hooks/api/cattle';
import { useFarms } from '@/hooks/api/farms';

const cattleSchema = z.object({
    tagNumber: z.string().nonempty('Tag number is required'),
    breed: z.string().nonempty('Breed is required'),
    gender: z.string().nonempty('Gender is required'),
    DOB: z.string().nonempty('Date of birth is required'),
    weight: z.string().nonempty('Weight is required'),
    location: z.string().nonempty('Location is required'),
    farmId: z.string().nonempty('Farm ID is required'),
    lastCheckupDate: z.string().nonempty('Last checkup date is required'),
    vaccineHistory: z.string().nonempty('Vaccine history is required'),
    purchaseDate: z.string().nonempty('Purchase date is required'),
    price: z.string().nonempty('Price is required'),
});

const AddCattleModal = ({ isOpen, onClose, handleRefetch }: any) => {
    const { addCattle, loading, error } = useCattle();
    const {
        farms,
        loading: farmsLoading,
        error: farmsError,
        fetchFarms,
    }: any = useFarms(); // Fetch farms

    useEffect(() => {
        fetchFarms();
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(cattleSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                tagNumber: data.tagNumber,
                breed: data.breed,
                gender: data.gender,
                DOB: new Date(data.DOB).toISOString(),
                weight: parseFloat(data.weight),
                price: parseFloat(data.price),
                location: data.location,
                farmId: data.farmId,
                lastCheckupDate: new Date(data.lastCheckupDate).toISOString(),
                vaccineHistory: data.vaccineHistory,
                purchaseDate: new Date(data.purchaseDate).toISOString(),
            };
            await addCattle(payload);
            onClose();
            handleRefetch();
            reset();
        } catch (err) {
            // Handle error if needed
        }
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
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <div className="font-bold text-lg">
                                        Add New Cattle
                                    </div>
                                </div>
                                <div className="p-5">
                                    {error && (
                                        <div className="text-red-500">
                                            {error}
                                        </div>
                                    )}
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="grid grid-cols-2  gap-2 "
                                    >
                                        <div className="mb-4">
                                            <InputField
                                                type="text"
                                                label="Tag Number"
                                                placeholder="Enter tag number"
                                                registration={register(
                                                    'tagNumber'
                                                )}
                                                error={
                                                    errors.tagNumber?.message
                                                }
                                                name={'tagNumber'}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <InputField
                                                type="text"
                                                name="breed"
                                                label="Breed"
                                                placeholder="Enter breed"
                                                registration={register('breed')}
                                                error={errors.breed?.message}
                                            />
                                        </div>
                                        <div className="mb-4">
                                                <label
                                                    htmlFor="gender"
                                                    className="block text-sm font-bold text-gray-700"
                                                >
                                                    Gender
                                                </label>
                                                <select
                                                    id="gender"
                                                    {...register('gender')}
                                                    className="mt-1 block w-full px-3 py-2 border text-gray-400 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                >
                                                    <option value="">
                                                        Select Gender
                                                    </option>
                                                    <option value="FEMALE">Female</option>
                                                    <option value="MALE">Male</option>
                                                </select>
                                                {errors.gender && (
                                                    <p className="text-sm text-red-600">
                                                        Gender is required
                                                    </p>
                                                )}
                                            </div>
                                        <div className="mb-4">
                                            <InputField
                                                type="date"
                                                registration={register('DOB')}
                                                label="Date of Birth"
                                                placeholder="Enter date of birth"
                                                name="DOB"
                                                error={errors.DOB?.message}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <InputField
                                                type="number"
                                                registration={register(
                                                    'weight'
                                                )}
                                                label="Weight"
                                                placeholder="Enter weight"
                                                name="weight"
                                                error={errors.weight?.message}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <InputField
                                                type="text"
                                                registration={register(
                                                    'location'
                                                )}
                                                label="Location"
                                                placeholder="Enter location"
                                                name="location"
                                                error={errors.location?.message}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="farmId"
                                                className="block text-sm font-bold text-gray-700"
                                            >
                                                Farm ID
                                            </label>
                                            <select
                                                id="farmId"
                                                {...register('farmId')}
                                                className="mt-1 block w-full px-3 py-2 border text-gray-400 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                            >
                                                <option value="">
                                                    Select Farm
                                                </option>
                                                {farmsLoading ? (
                                                    <option>Loading...</option>
                                                ) : (
                                                    farms?.data?.map((farm: any) => (
                                                        <option
                                                            key={farm.id}
                                                            value={farm.id}
                                                        >
                                                            {farm.name}
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                            {errors.farmId && (
                                                <p className="text-sm text-red-600">
                                                Farm is reuired 
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <InputField
                                                type="date"
                                                registration={register(
                                                    'lastCheckupDate'
                                                )}
                                                label="Last Checkup Date"
                                                placeholder="Enter last checkup date"
                                                name="lastCheckupDate"
                                                error={
                                                    errors.lastCheckupDate
                                                        ?.message
                                                }
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <InputField
                                                type="text"
                                                registration={register(
                                                    'vaccineHistory'
                                                )}
                                                label="Vaccine History"
                                                placeholder="Enter vaccine history"
                                                name="vaccineHistory"
                                                error={
                                                    errors.vaccineHistory
                                                        ?.message
                                                }
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <InputField
                                                type="date"
                                                registration={register(
                                                    'purchaseDate'
                                                )}
                                                label="Purchase Date"
                                                placeholder="Enter purchase date"
                                                name="purchaseDate"
                                                error={
                                                    errors.purchaseDate?.message
                                                }
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <InputField
                                                type="number"
                                                registration={register('price')}
                                                label="Price"
                                                placeholder="Enter price"
                                                name="price"
                                                error={errors.price?.message}
                                            />
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

export default AddCattleModal;
