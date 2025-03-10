import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AlertComponent from "../../Components/AlertComponent";
import AddButton from "../../Components/AddButton";
import {
  deleteSubject,
  getAddSubjectDatabase,
} from "../../api/ClassMaster/Addsubject";
import { Oval } from "react-loader-spinner";
import AddOrUpdateSubjectForm from "./AddOrUpdateSubjectForm ";
import "../../App.css";
import { toast } from "react-toastify";
import TableTitle from "../../Components/TableTitle";

const AddSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectUpdate, setSubjectUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getAddSubjectDatabase()
      .then((data) => {
        setSubjectData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataChanged) {
    fetchData(); 
    setDataChanged(false);
  }

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit ocument with ID:", documentId);
      setSubjectUpdate(true);
      setDocId(documentId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };

  const onConfirm = async () => {
    console.log("handle delete");
    const response = await deleteSubject(docId);
    console.log("Delete document with ID:", docId);
    if (response.status) {
      setDataChanged(true);
      setDocId(null);
      setShowDeleteAlert(false);
      toast.success(response.message);
    }
  };

  const onCancel = () => {
    setDocId(null);
    setShowDeleteAlert(false);
  };
  const openModal = () => {
    console.log("Open modal");
    setDocId(null);
    setSubjectUpdate(false);
    setIsModalOpen(true);
  };

  const handleSubjectAdded = () => {
    setDataChanged(true);
  };

  const handleSubjectUpdated = () => {
    setDocId(null);
    setSubjectUpdate(false);
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

              <TableTitle title={"Add Subjects"} />

              <DynamicTable
                data={subjectData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
                isLocateOn={false}
                attendanceStatus={false}
                selectSection={false}
                sectionList={false}
                csvFileName="Add Subjects"
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add subject"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateSubjectForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubjectAdded={handleSubjectAdded}
        handleSubjectUpdated={handleSubjectUpdated}
        DocId={docId}
        isUpdateOn={subjectUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddSubject;


// <CSVLink
//   data={subjectData}
//   onClick={() => {}}
//   className="cursor-pointer text-black font-semibold rounded bg-white px-3 py-1 mr-2"
// >
//   Export data
// </CSVLink>