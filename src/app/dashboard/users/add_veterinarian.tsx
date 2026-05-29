import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/input';
import { registerVeterinarian } from '@/hooks/api/auth';
import { useFarms } from '@/hooks/api/farms';
import toast from 'react-hot-toast';

const AddVeterinarianModal = ({ isOpen, onClose, handleRefetch }: any) => {
    const { farms, loading: farmsLoading } = useFarms();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        try {
            await registerVeterinarian(data);
            toast.success('Veterinarian account created. It will be active after super admin activates.');
            onClose();
            handleRefetch();
            reset();
        } catch (e: any) {
            toast.error(e.response?.data?.message || 'Failed to create veterinarian');
        }
    };

    const farmOptions = Array.isArray((farms as any)?.data) ? (farms as any).data : [];

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-start justify-center min-h-screen px-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-xl my-8 text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <div className="font-bold text-lg">Add Veterinarian Account</div>
                                </div>
                                <div className="p-5">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <InputField type="text" name="fullname" label="Full name" placeholder="Enter full name" registration={register('fullname', { required: true })} error={errors.fullname?.message} />
                                        <InputField type="text" name="username" label="Username" placeholder="Enter username" registration={register('username', { required: true })} error={errors.username?.message} />
                                        <InputField type="email" name="email" label="Email" placeholder="Enter email" registration={register('email', { required: true })} error={errors.email?.message} />
                                        <InputField type="text" name="phone" label="Phone" placeholder="Enter phone" registration={register('phone')} />
                                        <InputField type="password" name="password" label="Password" placeholder="Enter password" registration={register('password', { required: true, minLength: 8 })} error={errors.password?.message} />
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Farm (optional)</label>
                                            <select {...register('farmId')} className="w-full border rounded px-3 py-2 dark:bg-gray-800">
                                                <option value="">-- Select farm --</option>
                                                {farmOptions.map((f: any) => (
                                                    <option key={f.id} value={f.id}>{f.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button type="button" onClick={onClose} className="btn btn-outline-danger">Cancel</button>
                                            <button type="submit" className="btn btn-primary">Create</button>
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

export default AddVeterinarianModal;
