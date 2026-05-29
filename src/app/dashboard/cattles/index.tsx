import { useEffect, useState } from "react";
import DataTableV2, { TableColumnV2 } from "@/components/datatable";
import formatDateToLongForm from "@/utils/DateFormattter";
import { capitalize } from "lodash";
import IconPlus from "@/components/Icon/IconPlus";
import IconEdit from "@/components/Icon/IconEdit";
import IconTrash from "@/components/Icon/IconTrash";
import { toast } from "react-hot-toast";
import { useCattle } from "@/hooks/api/cattle";
import AddCattleModal from "./add_cattle";
import UpdateCattleModal from "./update_cattle";
import ConfirmDeleteModal from "./delete_cattle";
import { useSearchParams } from "react-router-dom";
import { isLoggedIn } from "@/hooks/api/auth";
import { getFarmId } from "@/utils/farmId";
import { canCreateEntity, canUpdateEntity, canDeleteEntity } from "@/utils/permissions";

const CattleList = () => {
  const [searchParams] = useSearchParams();
  const user = isLoggedIn();
  const role = user?.role ?? "";
  const canCreate = canCreateEntity("cattle", role);
  const canUpdate = canUpdateEntity("cattle", role);
  const canDelete = canDeleteEntity("cattle", role);
  const { cattle, allCattles, loading, fetchCattle, fetchAllCattle, deleteCattle }: any = useCattle();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCattle, setSelectedCattle] = useState<any>(null);

  const handleDelete = async () => {
    try {
      await deleteCattle(selectedCattle?.id);
      toast.success("Cattle deleted successfully");
      fetchCattle();
    } catch (error) {
      toast.error("Failed to delete cattle");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleRefetch = () => {
    Promise.all([fetchCattle(), fetchAllCattle()]);
    // fetchCattle(searchParams);
    // fetechAllCattle();
  };

  const openUpdateModal = (row: any) => {
    setSelectedCattle(row);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (row: any) => {
    setSelectedCattle(row);
    setIsDeleteModalOpen(true);
  };

  const farmId = getFarmId();

  useEffect(() => {
    if (!farmId) return;
    fetchCattle(searchParams);
  }, [searchParams, farmId]);
  useEffect(() => {
    if (!farmId) return;
    fetchAllCattle();
  }, [farmId]);

  const columns: TableColumnV2<any>[] = [
    {
      title: "Tag Number",
      accessor: "tagNumber",
      render: (row) => (
        <div>
          <p>{row?.tagNumber}</p>
          <p>{capitalize(row?.breed)}</p>,
        </div>
      ),
    },
    {
      title: "Gender",
      accessor: "gender",
      render: (row) => <p>{capitalize(row?.gender)}</p>,
    },
    {
      title: "Weight(Kg)",
      accessor: "weight",
      render: (row) => <p>{row?.weight}</p>,
    },
    {
      title: "Status",
      accessor: "status",
      render: (row) => {
        const status = row?.status;
        let color = "";

        switch (status) {
          case "HEALTHY":
            color = "green";
            break;
          case "SICK":
            color = "red";
            break;
          case "SOLD":
            color = "gray";
            break;
          case "PROCESSED":
            color = "blue";
            break;
          default:
            color = "black";
        }

        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            {/* Circle marker */}
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: color,
                marginRight: "8px",
              }}
            ></span>
            {/* Status text */}
            <span style={{ textTransform: "capitalize" }}>{status}</span>
          </span>
        );
      },
    },

    {
      title: "Farm ",
      accessor: "farm.name",
      render: (row) => <p>{row?.farm.name}</p>,
    },
    {
      title: "Last Checkup Date",
      accessor: "lastCheckupDate",
      render: (row) => <p>{formatDateToLongForm(row?.lastCheckupDate)}</p>,
    },
    {
      title: "Birth orign",
      accessor: "birthOrigin",
      render: (row) => <p>{row?.birthOrigin}</p>,
    },
    {
      title: "Date of Birth",
      accessor: "DOB",
      render: (row) => <p>{row.DOB ? formatDateToLongForm(row?.DOB): '-'}</p>,
    },
    {
      title: "Mother Tag",
      accessor: "mother.tagNumber",
      render: (row) => <p>{row.mother ? row.mother.tagNumber: '-'}</p>,
    },
    {
      title: "Purchase Date",
      accessor: "purchaseDate",
      render: (row) => <p>{row.purchaseDate ? formatDateToLongForm(row.purchaseDate): '-'}</p>,
    },
    {
      title: "Price(RWF)",
      accessor: "price",
      render: (row) => <p>{row.price ? row.price: '-'}</p>,
    },
    {
      title: "Previous owner",
      accessor: "previousOwner",
      render: (row) => <p>{row.previousOwner? row.previousOwner:'-'}</p>,
    },
    {
      title: "Date Created",
      accessor: "created_at",
      render: (row) => <p>{formatDateToLongForm(row?.createdAt)}</p>,
    },
    ...((canUpdate || canDelete)
      ? [
          {
            title: "Actions",
            accessor: "actions",
            render: (row: any) => (
              <div className="flex gap-2 justify-center">
                {canUpdate && (
                  <button onClick={() => openUpdateModal(row)}>
                    <IconEdit className="text-primary" />
                  </button>
                )}
                {canDelete && (
                  <button onClick={() => openDeleteModal(row)}>
                    <IconTrash className="text-danger" />
                  </button>
                )}
              </div>
            ),
          },
        ]
      : []),
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
            Cattle
          </button>
        </li>
      </ol>

      {canCreate && (
        <div className="flex flex-row justify-end gap-2 mb-2">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary flex items-center gap-1"
          >
            <IconPlus />
            Add Cattle
          </button>
        </div>
      )}

      <AddCattleModal
        cattles={allCattles?.data?.data ?? []}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        handleRefetch={handleRefetch}
      />
      <UpdateCattleModal
        cattles={allCattles?.data?.data ?? []}
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setSelectedCattle(null);
          setIsUpdateModalOpen(false);
        }}
        cattle={selectedCattle}
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
          data={cattle?.data?.data ?? []}
          isLoading={loading}
          tableName={"Cattle"}
          currentPage={cattle?.data?.currentPage ?? 0}
          total={cattle?.data?.total}
          lastPage={cattle?.data?.totalPages + 1}
          previousPage={cattle?.data?.previousPage}
          nextPage={cattle?.data?.nextPage}
        />
      </div>
    </div>
  );
};

export default CattleList;
