import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import {
  addTransportDataToDb,
  updateTransportDataToDatabase,
  getSpecificTransportDataFromDb,
} from "../../api/TransportMaster/AddStopAndFees";
import { toast } from "react-toastify";
import { calculateCollectionLength } from "../../api/CountLenghtDb";

const initialStopData = {
  stopName: "",
  stopId: 0,
  stopFees: 0,
};

const AddOrUpdateStopForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleStopAdded,
  handleStopUpdated,
}) => {
  const [stopId, setStopId] = useState("");
  const [stopData, setStopData] = useState(initialStopData);
  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      // Fetch stop data from Firebase when the modal is opened for update
      getStopData(DocId);
    }
    getRandomId();
  }, [isModalOpen, isUpdateOn]);

  const getRandomId = async () => {
    const length = await calculateCollectionLength("AddStopAndFees");
    console.log("length->", length);
    if (length === -1) {
      setStopId(`stop${Math.floor(Math.random() * 900) + 100}`);
      console.log("idsub->", stopId);
    } else {
      const formattedId =
        length + 1 < 10 ? `stop0${length + 1}` : `stop00${length + 1}`;
      setStopId(formattedId);
      console.log("idsub->", stopId);
    }
  };

  const getStopData = async (DocId) => {
    try {
      const stop = await getSpecificTransportDataFromDb(DocId);

      if (stop) {
        setStopData(stop);
      }
    } catch (error) {
      console.error("Error fetching stop data", error);
      toast.error("Error fetching data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStopData({
      ...stopData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateTransportDataToDatabase(DocId, stopData);

      setStopData(initialStopData);
      toast.success(response.message);
      setIsModalOpen(false);
      handleStopUpdated();
    } catch (error) {
      toast.error("Error updating data");
      console.error("Error updating stop data", error);
    }
  };

  const handleAdd = async () => {
    try {
      stopData.stopId = stopId;
      const response = await addTransportDataToDb(stopData);
      if (response.status) {
        setIsModalOpen(false);
        toast.success(response.message);
        setStopData(initialStopData);
      }

      if (!response.status) {
        setIsModalOpen(false);
        handleStopAdded();
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };
  if (!isModalOpen) return null;
  return (
    <Modal setShowModal={setIsModalOpen}>
      {error && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Fill all the fields
        </Alert>
      )}

      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        {isUpdateOn ? "Update Stop" : "Add Stop"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form">
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Stop Name*
                </label>
                <input
                  type="text"
                  name="stopName"
                  value={stopData.stopName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Stop ID*
                </label>
                <input
                  type="text"
                  name="stopId"
                  value={isUpdateOn ? stopData.stopId : stopId}
                  readOnly
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Stop Fees*
                </label>
                <input
                  type="number"
                  name="stopFees"
                  value={stopData.stopFees}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="addTeacher-buttons">
            <button
              type="button"
              onClick={isUpdateOn ? handleUpdate : handleAdd}
            >
              {isUpdateOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStopData(initialStopData);
                setIsModalOpen(false);
              }}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddOrUpdateStopForm;
