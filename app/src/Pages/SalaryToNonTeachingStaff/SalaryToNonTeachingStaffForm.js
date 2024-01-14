import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import { IoIosInformationCircleOutline } from "react-icons/io";

const SettingsFrom = ({
    isModalOpen,
  setIsModalOpen,
}) =>{

    const inticalData = {
        NoOfPaidHolidays: "",
        Bonus: "",
      };
    const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  if (!isModalOpen) return null;
  return (
    <Modal setShowModal={setIsModalOpen}>
      {error && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Fill all the fields
        </Alert>
      )}
        <div className="flex bg-[#333333]">
      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
       Settings
      </h2>
      <IoIosInformationCircleOutline  className="text-white absolute right-0 mt-3 mr-3 text-2xl"/>
      </div>
      
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="flex">
              <label className="block  font-medium text-gray-700 text-[20px]">
                     No. of paid holidays*
              </label>
              <input
              type="text"
              className="w-1/4 ml-10 p-2"/>
            </div>
            <div className="mt-0">
            <p className="text-sm">Salary is divided by total no. of </p>
            <p className="text-sm">working days and deductions are done</p>
            <p className='text-sm'>  if exceeding no. of paid holidays</p>
            </div>
            <div className="flex justify-between">
            <label className="flex items-center">
                <span className="ml-2 text-gray-700 text-[20px]">Give Bonus</span>
                <input
                    type="checkbox"
                    className="border-2 border-indigo-600 rounded-full bg-transparent w-8 h-8 ml-2"
                    // checked={checked}
                 // onChange={onChange} 
                />
            </label>
            </div>
            <div className="mt-0">
            <p className="text-sm">Salary is divided by total no. of </p>
            <p className="text-sm">working days and deductions are done</p>
            <p className='text-sm'>  if exceeding no. of paid holidays</p>
            </div>
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              className="w-full py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
                Update
            </button>
            <button
              type="button"
              onClick={() => {
                // setNoticeData(inticalData);
                setIsModalOpen(false);
              }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>
      </div>

      {confirmationMessage && (
        <div className="text-green-500 mt-4 text-center">
          {confirmationMessage}
        </div>
      )}
    </Modal>
  );
}

export default SettingsFrom;