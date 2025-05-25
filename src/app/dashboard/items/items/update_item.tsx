import { z } from "zod";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/input";
import { useVeterinarians } from "@/hooks/api/vet";
import AppSelect from "@/components/select/SelectField";
import { useItems } from "@/hooks/api/items";

const itemSchema = z.object({
  name: z.string().nonempty("Name is required"),
  unitPrice: z.number().nonnegative("Unit price is required"),
  categoryId: z.string().nonempty("category is required"),
  supplierId: z.string().nonempty("supplier is required"),
});

const UpdateItemModal = ({
  isOpen,
  onClose,
  item,
  handleRefetch,
  categoriesOptions,
  suppliersOptions,
}: any) => {
  const { updateItem, loading, error } = useItems();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: item,
  });

  useEffect(() => {
    reset(item);
  }, [item, reset]);

  const onSubmit = async (data: any) => {
    try {
      await updateItem(item.id, data);
      onClose();
      handleRefetch();
      reset();
    } catch (err) {}
  };
  console.log(categoriesOptions);
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
                  <div className="font-bold text-lg">Update Veterinarian</div>
                </div>
                <div className="p-5">
                  {error && <div className="text-red-500">{error}</div>}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="mb-4">
                        <InputField
                          type="text"
                          label="Name"
                          placeholder="Enter name"
                          registration={register("name")}
                          error={errors.name?.message}
                          name="name"
                        />
                      </div>
                      <div className="mb-4">
                        <InputField
                          type="number"
                          label="Unit Price"
                          placeholder="Enter unit price"
                          registration={register("unitPrice",{ valueAsNumber: true })}
                          error={errors.unitPrice?.message}
                          name="unitPrice"
                        />
                      </div>
                      <AppSelect
                        label="Category"
                        name="categoryId"
                        placeholder="Select category"
                        options={categoriesOptions}
                        defaultValue={{
                          label: `${item?.category?.name} `,
                          value: item?.category?.id,
                        }}
                        error={errors.categoryId?.message}
                        register={register}
                        setValue={setValue}
                        validation={{
                          required: "Category is required",
                        }}
                      />
                      <AppSelect
                        label="Supplier"
                        name="supplierId"
                        placeholder="Select supplier"
                        options={suppliersOptions}
                        defaultValue={{
                          label: `${item?.supplier?.name} `,
                          value: item?.supplier?.id,
                        }}
                        error={errors.supplierId?.message}
                        register={register}
                        setValue={setValue}
                        validation={{
                          required: "Supplier is required",
                        }}
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
                        {loading ? "Saving..." : "Save"}
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

export default UpdateItemModal;
