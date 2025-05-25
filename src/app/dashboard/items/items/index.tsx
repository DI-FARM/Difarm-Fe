import { useEffect, useState } from "react";
import DataTableV2, { TableColumnV2 } from "@/components/datatable";
import { capitalize, set } from "lodash";
import IconPlus from "@/components/Icon/IconPlus";
import IconEdit from "@/components/Icon/IconEdit";
import IconTrash from "@/components/Icon/IconTrash";
import { toast } from "react-hot-toast";
import AddVeterinaryModal from "./add_item";
import UpdateVeterinarianModal from "./update_item";
import ConfirmDeleteModal from "./delete";
import { useSearchParams } from "react-router-dom";
import { useItems } from "@/hooks/api/items";
import AddItemModal from "./add_item";
import { useCategory } from "@/hooks/api/category";
import { useSuppliers } from "@/hooks/api/suppliers";
import UpdateItemModal from "./update_item";

const Items = () => {
  const [searchParams] = useSearchParams();
  const { items, loading, deleteItem, getItems }: any = useItems();
  const [categoriesOptions, setCategoriesOptions] = useState<any>([]);
  const [suppliersOptions, setSuppliersOptions] = useState<any>([]);
  const {
    categories,
    getCategories,
    loading: categoryLoading,
    error: categoryError,
  } = useCategory();
  const {
    suppliers,
    getSuppliers,
    loading: supplierLoading,
    error: supplierError,
  } = useSuppliers();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});

  const handleDelete = async () => {
    try {
      await deleteItem(selectedItem.id);
      await getItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleRefetch = () => {
    getItems();
  };
  useEffect(() => {
    getItems(searchParams);
  }, [searchParams]);

  useEffect(() => {
    getCategories();
    getSuppliers();
  }, []);

  const columns: TableColumnV2<any>[] = [
    {
      title: "Name",
      accessor: "name",
      render: (row) => <p>{row?.name}</p>,
    },

    {
      title: "Unit Price",
      accessor: "unitPrice",
      render: (row) => <p>{row?.unitPrice}</p>,
    },

    {
      title: "Category",
      accessor: "category.name",
      render: (row) => <p>{row?.category.name}</p>,
    },
    {
      title: "Supplier",
      accessor: "supplier.name",
      render: (row) => <p>{row?.supplier.name}</p>,
    },
    {
      title: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              setSelectedItem(row);
              setIsUpdateModalOpen(true);
            }}
            className=""
          >
            <IconEdit className="text-primary" />
          </button>
          <button
            onClick={() => {
              setSelectedItem(row);
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

  useEffect(() => {
    if (categories.data && categories.data.length > 0) {
      const options = categories?.data.map((category: any) => ({
        label: category.name,
        value: category.id,
      }));
      setCategoriesOptions(options);
    }
    if (suppliers && suppliers.length > 0) {
      const options = suppliers?.map((supplier: any) => ({
        label: supplier.name,
        value: supplier.id,
      }));
      setSuppliersOptions(options);
    }
  }, [categories, categoryLoading, suppliers, supplierLoading]);

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
            Items
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
          Add Item
        </button>
      </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        handleRefetch={handleRefetch}
        categoriesOptions={categoriesOptions}
        suppliersOptions={suppliersOptions}
      />
      <UpdateItemModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        item={selectedItem}
        handleRefetch={handleRefetch}
        categoriesOptions={categoriesOptions}
        suppliersOptions={suppliersOptions}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <div className="w-full">
        <DataTableV2
          columns={columns}
          data={items?.data ?? []}
          isLoading={loading}
          currentPage={1}
          total={1}
          lastPage={1}
          previousPage={1}
          nextPage={1}
          tableName={"Items"}
        />
      </div>
    </div>
  );
};

export default Items;
