import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import { Oval } from "react-loader-spinner";
import AddFeeStructureModal from "./AddFeeStructureModal";
import {
  deleteFeeSlabData,
  getFeeSlabDataFromDatabase,
} from "../../api/FeeStructure/AddFeeSlab";
import { getFeeStructureDataTable } from "../../api/FeeStructure/AddFeeStructure";
import "../../App.css";
import TableTitle from "../../Components/TableTitle";
import { toast } from "react-toastify";

const AddFeeSlab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feeSlabUpdate, setFeeSlabUpdate] = useState(false);

  const [feeSlabData, setFeeSlabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getFeeStructureDataTable()
      .then((data) => {
        setFeeSlabData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit ocument with ID:", documentId);
      setFeeSlabUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      console.log("delete document with ID:", documentId);
    }
  };

  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleFeeSlabAdded = () => {
    setDataChanged(true);
  };

  return (
    <div className="ml-4 mt-4 w-full ov-sc">
      <div className="mt-5 max-w-full">
        <div className="flex justify-around">
          {isLoading ? (
            <Oval
              height={80}
              width={80}
              color="#333333"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#B5B5B5"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            <div className="add-optional-sub-table">
              <TableTitle title={'Add Fee Structure'} />
              <DynamicTable
                data={feeSlabData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
                isLocateOn={false}
                attendanceStatus={false}
                selectSection={false}
                sectionList={false}
                csvFileName="Fee Structure"
              />
            </div>
          )}
        </div>
      </div>
      <AddFeeStructureModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleFeeSlabAdded={handleFeeSlabAdded}
        DocId={docId}
        isUpdateOn={feeSlabUpdate}
      />
    </div>
  );
};

export default AddFeeSlab;
