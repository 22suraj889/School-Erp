import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AlertComponent from "../../Components/AlertComponent";
import AddButton from "../../Components/AddButton";
import AutomaticAssignForm from "./AutomaticAssignForm";
import { Oval } from "react-loader-spinner";
import "../../App.css";
import { toast } from "react-toastify";
import { getStudentListByJoiningClass, getStudentsWithoutJoiningSection, updateMultipleStudentsSections } from "../../api/StudentMaster/AddStudentDirectly";
import { getAllSectionsByClassName, getAllclassNames } from "../../api/ClassMaster/AddClassAndSection";
import TableTitle from "../../Components/TableTitle"


const AssignSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectUpdate, setSubjectUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [initialStudentAndClassData, setInitialStudentAndClassData] = useState([]);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);
  const [listOfStudentsWithoutJoiningSection, setListOfStudentsWithoutJoiningSection] = useState([]);

  const [selectedClass, setSelectedClass] = useState("KG");

  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getStudentListByJoiningClass(selectedClass)
      .then((data) => {
        setSubjectData(data.studentList);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
        setIsLoading(false);
      });
      
  };

  const getSectionsOfRespectiveClass = async (selectedClass) => {
    const res = await getAllSectionsByClassName(selectedClass);
    setSectionOptions(res);
};

  const getClasses = () => {
    getAllclassNames().then((data) => {
        setClassOptions(data);
    });
  };

  const getStudentsWithoutJoiningSectionfn = async (selectedClass) => {
    const res = await getStudentsWithoutJoiningSection(selectedClass);
    setTotalStudents(res.totalStudentsWithoutJoiningSection);
    setListOfStudentsWithoutJoiningSection(res.studentList);
    console.log(res);
  }

  useEffect(() => {
    fetchData();
    getClasses();
    if (selectedClass !== '' && selectedClass !== null) {
      getSectionsOfRespectiveClass(selectedClass);
      getStudentsWithoutJoiningSectionfn(selectedClass);

    }
  }, [selectedClass]);
  

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }

  const openModal = () => {
    setIsModalOpen(true)
  }


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

  const saveButtonClicked = async () => {
    console.log(initialStudentAndClassData );
    const res = await updateMultipleStudentsSections(initialStudentAndClassData)
try {

    console.log(res.message, "inside save button clicked");
    if(res.status){
    setIsSaveButtonDisabled(true)
    toast.success(res.message);
    }
    if(!res.status){
      toast.error(res.message);
  
  
    }

}
catch (e) {
    console.log("Error:" + e)
}
  };

  const handleSubjectAdded = () => {
    setDataChanged(true);
  };

  const handleSubjectUpdated = () => {
    setDocId(null);
    setSubjectUpdate(false);
    setDataChanged(true);
  };

  const onChangedSection = (selectedSection, studentId) => {

    const studentIndex = initialStudentAndClassData.findIndex((student) => student.studentId === studentId);

    if (studentIndex !== -1) {
      const updatedStudentData = [...initialStudentAndClassData];
      updatedStudentData[studentIndex].section = selectedSection;

      setInitialStudentAndClassData(updatedStudentData);
    } else {
      setInitialStudentAndClassData((prevData) => [
        ...prevData,
        { studentId, section: selectedSection },
      ]);
    }

    console.log("Selected Section:", selectedSection);
    console.log("Student ID:", studentId);
    setIsSaveButtonDisabled(false);
  };

  return (
    <div className="ml-4 mt-4 w-full ov-sc">
    <div className="assign-section-top-options">
    <label className="block text-sm ">
    Class
    </label>
    <select
        id="selectClass"
        name="selectClass"
        value={selectedClass}
        onChange={(e) => {setSelectedClass(e.target.value); fetchData(); setIsLoading(true);}}
        className="mt-1 block py-2 px-3 border text-gray-700 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
        {classOptions.map((options) => (
          <option key={options} value={options}>
            {options}
          </option>
        ))}
    </select>
    <button
    className="bg-blue-500 text-white px-3 py-1 text-sm m-1 rounded"
    onClick={() => openModal()}
  >
    {"Automatic Assign"}
  </button>
    </div>
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
            <TableTitle title={'Assign Section'} />
                
              <DynamicTable
                data={subjectData}
                rowHeight={100}
                action={false}
                ispanding={false}
                isLocateOn={false}
                attendanceStatus={false}
                selectSection={true}
                sectionList={sectionOptions}
                onChangeSection={onChangedSection}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                isButtonDisabled={isSaveButtonDisabled}
                  buttonText={"Save"}
                  onClickButton={saveButtonClicked}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AutomaticAssignForm
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      selectedClass={selectedClass}
      sectionOptions={sectionOptions}
      totalStudents={totalStudents}
      setTotalStudents={setTotalStudents} 
      listOfStudentsWithoutJoiningSection={listOfStudentsWithoutJoiningSection}
      setDataChanged={setDataChanged}
    />
    </div>
  );
};

export default AssignSection;
