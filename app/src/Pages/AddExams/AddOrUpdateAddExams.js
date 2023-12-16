import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";

import { addExamToDatabase, getSpecificExamData, updateExamInDatabase } from "../../api/ExamAddtion/AddExam";

const AddOrUpdateFeeSlab = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleFeeSlabAdded,
  handleFeeSlabUpdated,
}) => {
const inticalData = {
  examName: "",
  totalExamMarksReduced: 0,
  classesAndSubjects: [
    {
      className: "",
      subjects: [],
      optionalSubjects: []
    },
    {
      className: "",
      subjects: [],
      optionalSubjects: []
    }
  ],
  freezeDate: "", 
}; 
  const [examData, setExamData] = useState(inticalData);
 
  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getExamData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getExamData = async (DocId) => {
    try {
      const subject = await getSpecificExamData(DocId);

      if (subject) {
        setExamData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input is a checkbox, handle it separately
      const updatedClasses = checked
        ? [...(examData.applicableClasses ?? []), name]
        : (examData.applicableClasses ?? []).filter(
            (className) => className !== name
          );

      setExamData({
        ...examData,
        applicableClasses: updatedClasses,
      });
    } else {
      // For other input types, handle normally
      setExamData({
        ...examData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      console.log("pppp");
      const response = await updateExamInDatabase(DocId, examData);

      setConfirmationMessage(response.message);
      setExamData(inticalData);
      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleFeeSlabUpdated();
      }, 2000);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await addExamToDatabase(examData);

      setConfirmationMessage(response.message);

      setExamData(inticalData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleFeeSlabAdded();
    }, 2000);
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
        {isUpdateOn ? "Update Holidays/Event" : "Add Event/Holidays"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <div className="select-form-container">
                <label className="block text-sm font-medium text-gray-700">
                  Slab Name*
                </label>
                <input
                  type="text"
                  name="slabName"
                  value={examData.slabName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="select-form-container">
                <label className="block text-sm font-medium text-gray-700">
                  Slab I'd*
                </label>
                <input
                  type="text"
                  name="slabId"
                  value={examData.slabId}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-[100%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="form-first second-form">
              <div className="select-form-container checkbox-select">
                <label className="block text-sm font-medium text-gray-700">
                  Applicable for*
                </label>
                <div className="checkbox-container">
                  {classes.map((subject) => (
                    <div key={subject} className="checbox-many">
                      <label className="block text-[15px] font-medium text-[#333333]">
                        {subject}
                      </label>
                      <input
                        type="checkbox"
                        name={subject}
                        checked={examData.applicableClasses?.includes(
                          subject
                        )}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-4 h-4 block w-half"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="select-form-container text-area">
                <label className="block text-sm w-[200px] font-medium text-gray-700">
                  Requirements*
                </label>
                <textarea
                  rows="4"
                  type="date"
                  name="requirements"
                  value={examData.requirements}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-[110%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
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
                setExamData(inticalData);
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

export default AddOrUpdateFeeSlab;
