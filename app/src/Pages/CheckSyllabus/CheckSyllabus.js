import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { getTimetableTable } from "../../api/Timetable/Timetable";
import DynamicTimeTable from "../../Components/DynamicTimeTable";
import "../../App.css";

const CheckSyllabus = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    getTimetableTable()
      .then((data) => {
        setTimetableData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

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
              <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
                Check Syllabus
              </h1>
              <DynamicTimeTable
                data={timetableData}
                rowHeight={100}
                action={false} // Set action to false to hide edit and delete options
                ispanding={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckSyllabus;
