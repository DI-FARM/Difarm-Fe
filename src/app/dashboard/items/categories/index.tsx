import { useEffect, useState } from "react";
import DataTableV2, { TableColumnV2 } from "@/components/datatable";
import { capitalize, set } from "lodash";
import IconPlus from "@/components/Icon/IconPlus";
import IconEdit from "@/components/Icon/IconEdit";
import IconTrash from "@/components/Icon/IconTrash";
import { toast } from "react-hot-toast";
import AddVeterinaryModal from "./add_category";
import UpdateVeterinarianModal from "./update_category";
import ConfirmDeleteModal from "./delete";
import { useSearchParams } from "react-router-dom";
import { useItems } from "@/hooks/api/items";
import AddItemModal from "./add_category";
import { useCategory } from "@/hooks/api/category";
import { useSuppliers } from "@/hooks/api/suppliers";
import UpdateItemModal from "./update_category";
import AddCategoryModal from "./add_category";
import UpdateCategoryModal from "./update_category";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const {
    categories,
    getCategories,
    deleteCategory,
    loading,
    error,
  } = useCategory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCateogory, setSelectedCategory] = useState<any>({});

  const handleDelete = async () => {
    try {
      await deleteCategory(selectedCateogory.id);
      await getCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleRefetch = () => {
    getCategories();
  };
  useEffect(() => {
    getCategories();
  }, [searchParams]);

  useEffect(() => {
    getCategories();
    getCategories();
  }, []);

  const columns: TableColumnV2<any>[] = [
    {
      title: "Name",
      accessor: "name",
      render: (row) => <p>{row?.name}</p>,
    },

    {
      title: "Unit",
      accessor: "unit",
      render: (row) => <p>{row?.unit}</p>,
    },
    {
      title: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              setSelectedCategory(row);
              setIsUpdateModalOpen(true);
            }}
            className=""
          >
            <IconEdit className="text-primary" />
          </button>
          <button
            onClick={() => {
              setSelectedCategory(row);
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
            Categories
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
          Add Category
        </button>
      </div>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        handleRefetch={handleRefetch}
      />
      <UpdateCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        item={selectedCateogory}
        handleRefetch={handleRefetch}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <div className="w-full">
        <DataTableV2
          columns={columns}
          data={categories?.data ?? []}
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

export default Categories;
