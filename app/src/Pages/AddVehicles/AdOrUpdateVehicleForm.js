import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import {
  addVehicleDataToDb,
  updateVehicleDataToDatabase,
  getSpecificVehicleDataFromDb,
  getAllVehiclesName,
} from "../../api/TransportMaster/AddVehicle";
import { getAllTransportSlabs } from "../../api/TransportMaster/AddStopAndFees";
import { toast } from "react-toastify";

const initialVehicleData = {
  vehicleName: "",
  vehicleRegistrationNumber: "",
  vehicleId: 0,
  stops: [],
};

const AddVehicleForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleVehicleAdded,
  handleVehicleUpdated,
}) => {
  const [vehicleData, setVehicleData] = useState(initialVehicleData);
  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [stopsList, setStopsList] = useState([]);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      // Fetch vehicle data from Firebase when the modal is opened for update
      getVehicleData(DocId);
    }

    // Fetch stops data from the API
    fetchStopsData();
  }, [isModalOpen, isUpdateOn, DocId]);

  const fetchStopsData = async () => {
    await getAllTransportSlabs().then((data) => {
      setStopsList(data);
    });
  };

  const getVehicleData = async (DocId) => {
    try {
      const vehicle = await getSpecificVehicleDataFromDb(DocId);

      if (vehicle) {
        setVehicleData(vehicle);
      }
    } catch (error) {
      console.error("Error fetching vehicle data", error);
      toast.error("Error fetching data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (stop) => {
    const updatedStops = vehicleData.stops.includes(stop)
      ? vehicleData.stops.filter((s) => s !== stop)
      : [...vehicleData.stops, stop];

    setVehicleData({
      ...vehicleData,
      stops: updatedStops,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateVehicleDataToDatabase(DocId, vehicleData);

      setConfirmationMessage(response.message);
      setVehicleData(initialVehicleData);
      toast.success(response.message);
      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleVehicleUpdated();
      }, 2000); // Hide the message after 2 seconds
    } catch (error) {
      console.error("Error updating vehicle data", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await addVehicleDataToDb(vehicleData);

      setConfirmationMessage(response.message);
      setVehicleData(initialVehicleData);
      toast.success(response.message);
    } catch (error) {
      console.error("Error adding vehicle data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleVehicleAdded();
    }, 2000); // Hide the message after 2 seconds
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
        {isUpdateOn ? "Update Vehicle" : "Add Vehicle"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form">
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Vehicle Name*
                </label>
                <input
                  type="text"
                  name="vehicleName"
                  value={vehicleData.vehicleName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Registration Number*
                </label>
                <input
                  type="text"
                  name="vehicleRegistrationNumber"
                  value={vehicleData.vehicleRegistrationNumber}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Vehicle ID*
                </label>
                <input
                  type="text"
                  name="vehicleId"
                  value={vehicleData.vehicleId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Stops*
                </label>
                <div className="flex flex-wrap">
                  {stopsList?.map((stop) => (
                    <div key={stop}>
                      <label className="block text-[18px] font-medium text-[#333333]">
                        {stop}
                      </label>
                      <Checkbox
                        name={stop}
                        checked={vehicleData.stops.includes(stop)}
                        onChange={() => handleCheckboxChange(stop)}
                        className="mt-1 p-2 w-8 h-8 block w-half "
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="addTeacher-buttons">
        <button type="button" onClick={isUpdateOn ? handleUpdate : handleAdd}>
          {isUpdateOn ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={() => {
            setVehicleData(initialVehicleData);
            setIsModalOpen(false);
          }}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
        >
          Close
        </button>
      </div>
      {confirmationMessage && (
        <div className="text-green-500 mt-4 text-center">
          {confirmationMessage}
        </div>
      )}
    </Modal>
  );
};

export default AddVehicleForm;
