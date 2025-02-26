import { z } from "zod";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/input";
import { useCattle } from "@/hooks/api/cattle";
import { useFarms } from "@/hooks/api/farms";
import { Autocomplete } from "@mantine/core";
import { set } from "lodash";

const cattleSchema = z
  .object({
    tagNumber: z.string().min(3, "Tag number must be at least 3 characters").nonempty("Tag number is required"),
    breed: z.string().min(3, "Breed must be at least 3 characters").nonempty("Breed is required"),
    gender: z.string().nonempty("Gender is required"),
    // DOB: z.string().nonempty("Date of birth is required"),
    weight: z.string().nonempty("Weight is required"),
    location: z.string().min(3, "Location must be at least 3 characters").nonempty("Location is required"),
    lastCheckupDate: z.string().nonempty("Last checkup date is required"),
    // purchaseDate: z.string().nonempty('Purchase date is required'),
    // price: z.string().nonempty('Price is required'),
    birthOrigin: z.enum(["OnFarm", "Purchased"]),
    purchaseDate: z.union([z.string(), z.null(), z.undefined()]),
    DOB: z.union([z.string(), z.null(), z.undefined()]),
    previousOwner: z.union([z.string(), z.null(), z.undefined()]),
    motherId: z.union([z.string(), z.null(), z.undefined()]),
    price: z.union([z.string(), z.null(), z.undefined()]),
  })
  .superRefine(
    (
      { birthOrigin, purchaseDate, previousOwner, price, motherId, DOB },
      ctx
    ) => {
      if (birthOrigin === "Purchased") {
        if (!purchaseDate) {
          ctx.addIssue({
            code: "custom",
            message: "purchaseDate is required when birthOrigin is 'Purchased'",
            path: ["purchaseDate"],
            fatal: true,
          });
        }
        if (!previousOwner) {
          ctx.addIssue({
            code: "custom",
            message:
              "previousOwner is required when birthOrigin is 'Purchased'",
            path: ["previousOwner"],
            fatal: true,
          });
        }
        if (price === null) {
          ctx.addIssue({
            code: "custom",
            message: "price is required when birthOrigin is 'Purchased'",
            path: ["price"],
            fatal: true,
          });
        }
        if (motherId || DOB) {
          ctx.addIssue({
            code: "custom",
            message:
              "mother ID / DOB should not be provided when the birthOrigin is 'Purchased'",
            fatal: true,
            path: ["motherId", "DOB"],
          });
        }
      }

      if (birthOrigin === "OnFarm") {
        if (!motherId) {
          ctx.addIssue({
            code: "custom",
            message: "motherId is required when birthOrigin is 'OnFarm'",
            path: ["motherId"],
            fatal: true,
          });
        }
        if (!DOB) {
          ctx.addIssue({
            code: "custom",
            message: "date of birth is required when birthOrigin is 'OnFarm'",
            path: ["DOB"],
            fatal: true,
          });
        }
        if (purchaseDate || previousOwner || price !== null) {
          ctx.addIssue({
            code: "custom",
            message:
              "purchaseDate, previousOwner, and price should not be provided when birthOrigin is 'OnFarm'",
            path: ["purchaseDate", "previousOwner", "price"],
            fatal: true,
          });
        }
      }
    }
  );

const AddCattleModal = ({ isOpen, onClose, handleRefetch, cattles }: any) => {
  const { addCattle, loading, error } = useCattle();
  const {
    farms,
    loading: farmsLoading,
    error: farmsError,
    fetchFarms,
  }: any = useFarms();

  const [motherValue, setMotherValue] = useState('');
  const [isMotherTag, setisMotherTag] = useState<boolean>(true);
  console.log(cattles)
  useEffect(() => {
    fetchFarms();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(cattleSchema),
  });
  const birthOrigin = watch("birthOrigin");
  const FarmId = localStorage.getItem("FarmId");

  useEffect(() => {
    if (birthOrigin === "OnFarm") {
      setValue("purchaseDate", null);
      setValue("previousOwner", null);
      setValue("price", null);
    } else if (birthOrigin === "Purchased") {
      setValue("motherId", null);
      setValue("DOB", null);
    }
  }, [birthOrigin, setValue]);

  const handleSelectedMother = (values: string) => {
    console.log('first')
    setMotherValue(values);
    const selectedMother = cattles.find(
        (cattle:any) => cattle.tagNumber === values,
    );
    if (selectedMother) {
        setisMotherTag(true);
        setValue('motherId', selectedMother.id); // Set the value in the form
        trigger('motherId'); // Trigger the validation manually
    }
    else{
        setisMotherTag(false);
    }

  };
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        tagNumber: data.tagNumber,
        breed: data.breed,
        gender: data.gender,
        birthOrigin: data.birthOrigin,
        previousOwner: data.previousOwner,
        motherId: data.motherId,
        DOB: data.DOB ? new Date(data.DOB).toISOString(): null,
        weight: parseFloat(data.weight),
        price: parseFloat(data.price),
        location: data.location,
        farmId: FarmId,
        lastCheckupDate: new Date(data.lastCheckupDate).toISOString(),
        vaccineHistory: data.vaccineHistory,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate).toISOString() : null,
      };
      await addCattle(payload);
      handleRefetch();
      if (!error) {
        onClose();
        handleRefetch();
        reset();
      }
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
                  <div className="font-bold text-lg">Add New Cattle</div>
                </div>
                <div className="p-5">
                  {error && <div className="text-red-500">{error}</div>}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-2  gap-2 "
                  >
                    <div className="mb-4">
                      <InputField
                        type="text"
                        label="Tag Number"
                        placeholder="Enter tag number"
                        registration={register("tagNumber")}
                        error={errors.tagNumber?.message}
                        name={"tagNumber"}
                      />
                    </div>
                    <div className="mb-4">
                      <InputField
                        type="text"
                        name="breed"
                        label="Breed"
                        placeholder="Enter breed"
                        registration={register("breed")}
                        error={errors.breed?.message}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="birthOrigin"
                        className="block text-sm font-bold text-gray-700"
                      >
                        Birth Origin
                      </label>
                      <select
                        id="birthOrigin"
                        {...register("birthOrigin")}
                        className="mt-1 block w-full px-3 py-2 border text-gray-400 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      >
                        <option value="">Select Origin</option>
                        <option value="OnFarm">OnFarm</option>
                        <option value="Purchased">Purchased</option>
                      </select>
                      {errors.birthOrigin && (
                        <p className="text-sm text-red-600">
                          birthOrigin is required
                        </p>
                      )}
                    </div>
                    {birthOrigin === "Purchased" && (
                      <>
                        <div className="mb-4">
                          <InputField
                            type="date"
                            registration={register("purchaseDate")}
                            label="Purchase Date"
                            placeholder="Enter purchase date"
                            name="purchaseDate"
                            error={errors.purchaseDate?.message}
                          />
                        </div>
                        <div className="mb-4">
                          <InputField
                            type="text"
                            registration={register("previousOwner")}
                            label="Previous Owner"
                            placeholder="Enter previous owner"
                            name="previousOwner"
                            error={errors.previousOwner?.message}
                          />
                        </div>
                        <div className="mb-4">
                          <InputField
                            type="number"
                            registration={register("price")}
                            label="Price (RWF)"
                            placeholder="Enter price"
                            name="price"
                            error={errors.price?.message}
                          />
                        </div>
                      </>
                    )}
                    {birthOrigin === "OnFarm" && (
                      <>
                        <div className="mb-4">
                          <InputField
                            type="date"
                            registration={register("DOB")}
                            label="Date of Birth"
                            placeholder="Enter date of birth"
                            name="DOB"
                            error={errors.DOB?.message}
                          />
                        </div>
                        <div className="mb-4">
                        <Autocomplete
                          label="Select mother tag"
                          placeholder="Mother Tag"
                          error={!isMotherTag}
                          value={motherValue}
                          onChange={(value)=>handleSelectedMother(value)}
                          data={cattles.map(
                            (cattle:any) =>
                              `${cattle.tagNumber}`
                          )}
                        />
                        {/* {errors.motherId?.message && <p className="text-red-500 text-sm ">{errors.motherId?.message || ""}</p>} */}
                        </div>
                      </>
                    )}
                    <div className="mb-4">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-bold text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        {...register("gender")}
                        className="mt-1 block w-full px-3 py-2 border text-gray-400 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      >
                        <option value="">Select Gender</option>
                        <option value="Cow">Cow</option>
                        <option value="Bull">Bull</option>
                      </select>
                      {errors.gender && (
                        <p className="text-sm text-red-600">
                          Gender is required
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <InputField
                        type="number"
                        registration={register("weight")}
                        label="Weight (kg)"
                        placeholder="Enter weight"
                        name="weight"
                        error={errors.weight?.message}
                      />
                    </div>
                    <div className="mb-4">
                      <InputField
                        type="text"
                        registration={register("location")}
                        label="Location"
                        placeholder="Enter location"
                        name="location"
                        error={errors.location?.message}
                      />
                    </div>

                    <div className="mb-4">
                      <InputField
                        type="date"
                        registration={register("lastCheckupDate")}
                        label="Last Checkup Date"
                        placeholder="Enter last checkup date"
                        name="lastCheckupDate"
                        error={errors.lastCheckupDate?.message}
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

export default AddCattleModal;
