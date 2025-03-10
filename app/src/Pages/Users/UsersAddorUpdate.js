import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import { toast } from "react-toastify";
import { getSpecificUser, signupAdminUser, updateSpecificUser } from "../../api/Authapi/auth";

const AddOrUpdateUsersForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleExpenseAdded,
  handleExpenseUpdated,
}) => {
  const inticalData = {
    userName: "",
    password: "",
    role: "",
  };
  const [expenseData, setExpenseData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getexpenseData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getexpenseData = async (DocId) => {
    try {
      const subject = await getSpecificUser(DocId);

      if (subject) {
        setExpenseData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      toast.error("Error fetching data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateSpecificUser(DocId, expenseData);
      if(response.status){
      toast.success(response.message);
      }
      if(!response.status){
        toast.error(response.message);
      }
      setExpenseData(inticalData);

   
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleExpenseUpdated();
 
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await signupAdminUser(expenseData);
      // Show a confirmation message
      setConfirmationMessage(response.message);
      if(!response.status){
        toast.error(response.message);
      }
      if(response.status){
      toast.success(response.message);
      }
      setExpenseData(inticalData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }

      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleExpenseAdded();

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
        {isUpdateOn ? "Update User" : "Add User"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Username*
              </label>
              <input
                type="text"
                name="userName"
                value={expenseData.userName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Password*
              </label>
              <input
                type="password"
                name="password"
                value={expenseData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <label className="block text-sm w-[200px] font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={expenseData.role}
                onChange={handleInputChange}
                require
                className="mt-1 p-2 block w-[94%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">--- Select ---</option>
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="subadmin">Sub Admin</option>
              </select>
            </div>
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={isUpdateOn ? handleUpdate : handleAdd}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              {isUpdateOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setExpenseData(inticalData);
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
};

export default AddOrUpdateUsersForm;
