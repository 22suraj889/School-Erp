import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import { Oval } from "react-loader-spinner";
import SettingsFrom from "./SalaryToTeacherform";
import { getTeacherAndSalaryDataFromDatabase } from "../../api/StaffManagement/SalaryToTeachers";
import "../../App.css";

const TeacherSalaryTable = () => {
  const [teacherSalaryData, setTeacherSalaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = (selectedMonth) => {
    setIsLoading(true);
    getTeacherAndSalaryDataFromDatabase(selectedMonth)
      .then((data) => {
        setTeacherSalaryData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };
  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };
  useEffect(() => {
    // Get the abbreviated month
    const abbreviatedMonth = new Date().toLocaleString('default', { month: 'short' });

    // Set the initial state for selectedMonth
    setSelectedMonth(abbreviatedMonth);

    // Fetch data initially with the current month
    fetchData(abbreviatedMonth);
  }, []);

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
    fetchData(selectedMonth);
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
            <div>
              <div className="flex flex-row-reverse">
                <button className="bg-gray-700 p-3 mb-5 text-white border border-gray-300 rounded-md" onClick={openModal}>Settings</button>
                </div>
            <div className="add-optional-sub-table">
            <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
            Salary To be Paid
            <SettingsFrom
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}/>
            <select
            id="teacherMonthSelect"
            className="text-black ml-4"
            name="teacherMonthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
            <option value="Jul">July</option>
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
          </select>
          </h1>
              <DynamicTable
                data={teacherSalaryData}
                rowHeight={100}
                action={false}
                ispanding={false}
                csvFileName="Teachers Salaries"
              />
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherSalaryTable;
