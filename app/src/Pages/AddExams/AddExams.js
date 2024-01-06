import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import { Oval } from "react-loader-spinner";

import AddOrUpdateFeeSlab from "./AddOrUpdateAddExams";

import { deleteExam, getExamsDatabase } from "../../api/ExamAddtion/AddExam";
import "../../App.css";
import TableTitle from "../../Components/TableTitle";

const AddExam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examDataUpdate, setExamDataUpdate] = useState(false);

  const [examData, setExamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getExamsDatabase()
      .then((data) => {
        setExamData(data);
        console.log(examData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });

    console.log(examData);
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
    console.log(examData);
  }, []);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit ocument with ID:", documentId);
      setExamDataUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      const response = await deleteExam(documentId);
      console.log("Delete document with ID:", documentId);
      if (response.status) {
        setDataChanged(true);
      }
    }
  };

  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleExamAdded = () => {
    setDataChanged(true);
  };

  const handlExamUpdated = () => {
    setExamDataUpdate(true);
    setTimeout(() => {
      setExamDataUpdate(false);
      setDataChanged(true);
    }, 2000);
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
            <TableTitle title={'Add Exams'} />

              <DynamicTable
                data={examData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
                isLocateOn={false}
                attendanceStatus={false}
                selectSection={false}
                sectionList={false}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton buttonText={"Add Exam"} onClickButton={openModal} />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateFeeSlab
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleExamAdded={handleExamAdded}
        handlExamUpdated={handlExamUpdated}
        DocId={docId}
        isUpdateOn={examDataUpdate}
      />
    </div>
  );
};

export default AddExam;
