import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import { Oval } from "react-loader-spinner";
import {
  addVehicleDataToDb,
  deleteVehicleData,
  getVehicleDataFromDatabase,
} from "../../api/TransportMaster/AddVehicle";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import AddVehicleForm from "./AdOrUpdateVehicleForm";
import AlertComponent from "../../Components/AlertComponent";
import "../../App.css";
import { toast } from "react-toastify";
import TableTitle from "../../Components/TableTitle"

const AddVehicle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleUpdate, setVehicleUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getVehicleDataFromDatabase()
      .then((data) => {
        setVehicleData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
        setIsLoading(false);
      });
  };

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      setVehicleUpdate(true);
      setDocId(documentId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataChanged) {
    fetchData();
    setDataChanged(false);
  }

  const onConfirm = async () => {
    const response = await deleteVehicleData(docId);
    console.log("Delete document with ID:", docId);
    if (response.status) {
      setDataChanged(true);
      setDocId(null);
      setShowDeleteAlert(false);
      toast.success(response.message);
    }
    if(!response.status){
      setDocId(null);
      setShowDeleteAlert(false);
      toast.error(response.message);
    }
  };

  const onCancel = () => {
    setDocId(null);
    setShowDeleteAlert(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setDocId(null);
    setVehicleUpdate(false);
  };

  const handleVehicleAdded = () => {

      setDataChanged(true);

  };

  const handleVehicleUpdated = () => {
    setVehicleUpdate(true);

      setVehicleUpdate(false);
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
              <TableTitle title={'Add Vehicle'} />
              <DynamicTable
                data={vehicleData}
                rowHeight={100}
                action={true}
                handleAction={handleAction}
                ispanding={false}
                isLocateOn={false}
                attendanceStatus={false}
                selectSection={false}
                sectionList={false}
                csvFileName="Added Vehicle"
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add Vehicle"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddVehicleForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleVehicleAdded={handleVehicleAdded}
        handleVehicleUpdated={handleVehicleUpdated}
        DocId={docId}
        isUpdateOn={vehicleUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddVehicle;
