import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import {
  addOptionalSubjectToDatabase,
  getOptionalSubjectDataFromDb,
  updateOptionalSubjectDatabase,
} from "../../api/ClassMaster/AddOptionalSubject";
import "./AddOptionalSubject.css";
import "../AddTeacher/AddTeacherForm.css";
import { toast } from "react-toastify";

const AddOrUpdateOptionalSubjectForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleSubjectAdded,
  handleSubjectUpdated,
}) => {
  const [subjectData, setSubjectData] = useState({
    subjectTotalMarks: 100,
    subjectName: "",
    subjectCode: "",
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getSubjectData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getSubjectData = async (DocId) => {
    try {
      const subject = await getOptionalSubjectDataFromDb(DocId);

      if (subject) {
        setSubjectData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      toast.error("Error fetching data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubjectData({
      ...subjectData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateOptionalSubjectDatabase(DocId, subjectData);


      setSubjectData({
        subjectTotalMarks: 100,
        subjectName: "",
        subjectCode: "",
      });
      toast.success(response.message);
      setIsModalOpen(false);
      handleSubjectUpdated();
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    if (!subjectData.subjectCode || !subjectData.subjectName) {
      setError(true);
    } else {
      try {
        const response = await addOptionalSubjectToDatabase(subjectData);

        setSubjectData({
          subjectTotalMarks: 100,
          subjectName: "",
          subjectCode: "",
        });
        toast.success(response.message);
        setIsModalOpen(false);
        handleSubjectAdded();
        
      } catch (error) {
        console.error("Error updating subject data", error);
      }
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
        {" "}
        {isUpdateOn ? "Update Subject" : "Add Subject"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Subject Code
              </label>
              <input
                type="text"
                name="subjectCode"
                value={subjectData.subjectCode}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Subject Name
              </label>
              <input
                type="text"
                name="subjectName"
                value={subjectData.subjectName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Subject Total Marks
              </label>
              <input
                type="number"
                name="subjectTotalMarks"
                value={subjectData.subjectTotalMarks}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={isUpdateOn ? handleUpdate : handleAdd}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
            >
              {isUpdateOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSubjectData({
                  subjectTotalMarks: 100,
                  subjectName: "",
                  subjectCode: "",
                });
                setIsModalOpen(false);
              }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>
      </div>
   
    </Modal>
  );
};

export default AddOrUpdateOptionalSubjectForm;
