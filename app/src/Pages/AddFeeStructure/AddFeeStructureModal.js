import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import "../AddTeacher/AddTeacherForm.css";
import AddButton from "../../Components/AddButton";
import FeeSlabNamePopUp from "./FeeSlabNamePopup";
import AddTextField from "../../Components/AddTextField";
import {
  addFeeStructure,
  getSpecificFeeStructure,
  isDocpresentInDb,
  slabarrayfromactualdb,
  updateFeeStructure,
} from "../../api/FeeStructure/AddFeeStructure";
import { documentId } from "firebase/firestore";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
const AddOrUpdateFeeSlab = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleFeeSlabAdded,
}) => {
  const initialData = {
    slabName: "",
    applicableFees: [],
  };

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [newSlabName, setNewSlabName] = useState("");
  const [trackActiveCom, setTrackActiveCom] = useState(1);
  const [feeSlabArray, setFeeSlabArray] = useState([]);
  const [applicationFee, setApppicaiontFee] = useState(0);
  const [feeStructureData, setFeeStructureData] = useState({});
  const [feeSlabs, setFeeSlabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalFees, setTotalFees] = useState(0);
  const [totalValuesList, setTotalValuesList] = useState([]);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getFeeSlabData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getFeeSlabData = async (DocId) => {
    try {
      setIsLoading(true);
      const feeStruct = await getSpecificFeeStructure(DocId);
      console.log(feeStruct);
      setApppicaiontFee(feeStruct?.applicationFee);

      const neweStruct = transformDataToArray(feeStruct);
      console.log(neweStruct);

      const feeSlabs = await slabarrayfromactualdb(DocId);

      // Map feeSlabs with data from neweStruct or set initialData if not present
      const updatedFeeSlabArray = feeSlabs.map((slabName) => ({
        slabName,
        data: neweStruct.find((item) => item.slabName === slabName)?.data || {
          ...initialData,
        },
      }));

      setFeeSlabArray(updatedFeeSlabArray);
      console.log(updatedFeeSlabArray);
      // Map through updatedFeeSlabArray
      updatedFeeSlabArray.forEach((slab) => {
        let totalValues = 0; // Initialize as a number for each slab

        slab.data.applicableFees.forEach((fee) => {
          Object.values(fee).forEach((value) => {
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
              totalValues += parsedValue;
            }
          });
        });
        setTotalValuesList((prevList) => [...prevList, totalValues]);
        console.log(totalValuesList)
      });
    } catch (error) {
      console.error("Error fetching feeStruct data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const transformDataToArray = (originalData) => {
    const transformedData = [];

    for (const slabName in originalData) {
      if (
        slabName !== "className" &&
        slabName !== "applicationFee" &&
        slabName !== "createdAt"
      ) {
        const slabData = originalData[slabName];
        const slabObject = {
          slabName: slabName,
          data: {
            applicableFees: [],
          },
        };

        if (
          slabData &&
          typeof slabData === "object" &&
          Object.keys(slabData).length > 0
        ) {
          for (const key in slabData) {
            slabObject.data.applicableFees.push({
              [key]: slabData[key],
            });
          }
        }

        transformedData.push(slabObject);
      }
    }

    return transformedData;
  };

  const handleInputChange = (e, index, classIndex, value) => {
    console.log(value);
    const updatedArray = [...feeSlabArray];
    const firstKey = Object.keys(
      feeSlabArray[index].data.applicableFees[classIndex]
    )[0];
    feeSlabArray[index].data.applicableFees[classIndex][firstKey] =
      e.target.value;

    setFeeSlabArray(updatedArray);
    console.log(updatedArray);

    const transformedData = {
      className: DocId,
      applicationFee: applicationFee,
    };

    updatedArray.forEach((entry) => {
      const slabName = entry.slabName;
      const applicableFees = entry.data.applicableFees;

      transformedData[slabName] = {};

      applicableFees.forEach((fee) => {
        const [key] = Object.keys(fee);
        transformedData[slabName][key] = fee[key];
      });
    });

    console.log(transformedData);
    setFeeStructureData(transformedData);
  };

  const handleAddSlab = () => {
    const activeIndex = activeCom - 1;
    const updatedArray = [...feeSlabArray];
    const slabData = updatedArray[activeIndex].data;
    const newClass = { [newSlabName]: "" };

    slabData.applicableFees = [...(slabData.applicableFees || []), newClass];

    setNewSlabName("");
    setFeeSlabArray(updatedArray);
    setIsModalOpen2(false);
    console.log(updatedArray);
  };

  const handleAdd = async () => {
    try {
      const response = await addFeeStructure(feeStructureData);

      if (response.status) {
        setApppicaiontFee(0);
        setIsModalOpen(false);
        handleFeeSlabAdded();
        toast.success(response.message);
      }
      if (!response.status) {
        setApppicaiontFee(0);
        setIsModalOpen(false);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating feeStruct data", error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <Modal setShowModal={setIsModalOpen}>
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
        <>
          <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
            {isUpdateOn ? "Add Fee Structure" : "Add Fee Structure"}
          </h2>
          <div className="addTeacher-form">
            <form>
              <div className="addTeacher-main-form">
                <div className="form-first">
                  <div>
                    <label className="block text-[18px] font-medium text-[#333333]">
                      Admission Fees*
                    </label>
                    <input
                      type="Number"
                      name="applicationFee"
                      value={applicationFee}
                      onChange={(e) => setApppicaiontFee(e.target.value)}
                      required
                      className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="addTeacher-components">
                <div className="components-name">
                  {feeSlabArray.map((slab, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setActiveCom(index + 1);
                        setTrackActiveCom(index + 1);
                      }}
                      className={
                        activeCom === index + 1 ? "active-component" : ""
                      }
                    >
                      {slab.slabName}
                    </div>
                  ))}
                </div>
                {feeSlabArray.map((slab, index2) => (
                  <>
                    <div
                      key={index2}
                      className={
                        activeCom === index2 + 1
                          ? "component-card component-card-two"
                          : "hidden-card"
                      }
                    >
                      <div className="flex gap-[50px] items-center">
                        <label className="block text-[18px] font-medium text-[#333333]">
                        {`${slab.slabName} Total`}
                        </label>
                        <input
                          type="Number"
                          name="totalFees"
                          value={totalValuesList[index2]}
                          readOnly
                          required
                          className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      {activeCom === index2 + 1 && (
                        <div className="applicable-classes">
                          <ul>
                            {slab.data.applicableFees.map(
                              (classObj, classIndex) => (
                                <li key={classIndex}>
                                  <AddTextField
                                    label={Object.keys(classObj)[0]}
                                    value={Object.values(classObj)[0]}
                                    onChange={(e) => {
                                      handleInputChange(
                                        e,
                                        index2,
                                        classIndex,
                                        Object.values(classObj)[0]
                                      );
                                    }}
                                  />
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      <AddButton
                        buttonText={"Add a Slab"}
                        onClickButton={() => setIsModalOpen2(true)}
                      />
                    </div>
                  </>
                ))}
              </div>
              <div className="add-feeStruct-btn addTeacher-buttons">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
                >
                  {"Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setApppicaiontFee(0);
                    setFeeSlabArray(
                      feeSlabs.map((slabName) => ({
                        slabName,
                        data: { ...initialData },
                      }))
                    );
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
          <FeeSlabNamePopUp
            isModalOpen2={isModalOpen2}
            setIsModalOpen2={setIsModalOpen2}
            newSlabName={newSlabName}
            setNewSlabName={setNewSlabName}
            activeCom={trackActiveCom}
            onAddSlab={handleAddSlab}
          />
        </>
      )}
    </Modal>
  );
};

export default AddOrUpdateFeeSlab;
