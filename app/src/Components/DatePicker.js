import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner"; // Assuming you are using the Oval component for loading
import "../Pages/PutAttendance/PutAttendancs.css";
import { CiSearch } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import "./DynamicTable.css";
import {
  getAttendanceList,
  storeStaffAttendance,
} from "../api/StaffAttendance/StaffAttendance";
import { toast } from "react-toastify";
import "./Sidebar.css"

const DatePicker = ({ minDate, maxDate }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const getNumberDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getSortedDays = (year, month) => {
    const dayIndex = new Date(year, month, 1).getDay();
    const firstHalf = days.slice(dayIndex);
    return [...firstHalf, ...days.slice(0, dayIndex)];
  };

  const range = (start, end) => {
    const length = Math.abs((end - start) / 1);
    const { result } = Array.from({ length }).reduce(
      ({ result, current }) => ({
        result: [...result, current],
        current: current + 1,
      }),
      { result: [], current: start }
    );

    return result;
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceList, setAttendanceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState({});


  const formatToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchAttendanceList = async (selectedDate2) => {
    const formattedDate = formatToYYYYMMDD(selectedDate2);

    try {
      const attlist = await getAttendanceList(formattedDate);
      setAttendanceList(attlist);
      console.log(attlist);

      const transformedData = {
        staffArray: attlist.map((entry) => ({
          staffid: entry.EmpId,
          isPresent: entry.Status,
          name: entry.Name,
        })),
        date: formattedDate,
      };
      setAttendanceData(transformedData);
      console.log(attendanceList);
      console.log(attendanceData);
    } catch (error) {
      console.error("Error fetching attendance list:", error);
      toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceList(selectedDate);
  }, [selectedDate]);

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleSelectedDate = async (event) => {
    if (!isPastDate(currentYear, currentMonth, event.target.getAttribute("data-day"))) {
      setIsButtonDisabled(true);
      if (event.target.id === "day") {
        const selectedDay = event.target.getAttribute("data-day");
        const newSelectedDate = new Date(currentYear, currentMonth, selectedDay);

        setSelectedDate(newSelectedDate);
        setIsLoading(true);
        fetchAttendanceList(newSelectedDate);
      }
    }
  };

  const getTimeFromState = (_day) => {
    return new Date(currentYear, currentMonth, _day).getTime();
  };

  // const handleAction = async (actionType, staffId) => {
  //   if(!isPastMonth(currentYear, currentMonth)){
  //   setIsButtonDisabled(false);
  //     setAttendanceData( async (attendanceData) =>  {
  //       const updatedStaffArray = attendanceData.staffArray.map((staff) => {
  //         if (staff.staffid === staffId) {
  //           return {
  //             ...staff,
  //             isPresent: !staff.isPresent, // Toggle the isPresent value
  //           };
  //         }
  //         return staff;
  //       });

  //       const updatedAttendanceList = attendanceList?.map((entry) => {
  //         if (entry.EmpId === staffId) {
  //           return {
  //             ...entry,
  //             Status: !entry.Status,
  //           };
  //         }
  //         return entry;
  //       });


  //       setAttendanceList(updatedAttendanceList);
  //       await handleSaveAttendence()
  //       return {
  //         ...attendanceData,
  //         staffArray: updatedStaffArray,
  //       };
  //     });
  //   }
  // };

  const handleAction = async (staffId) => {
    if (!isPastMonth(currentYear, currentMonth)) {
      setIsButtonDisabled(false);

      // Update the local state first
      setAttendanceData((attendanceData) => {
        const updatedStaffArray = attendanceData.staffArray.map((staff) => {
          if (staff.staffid === staffId) {
            return {
              ...staff,
              isPresent: !staff.isPresent, // Toggle the isPresent value
            };
          }
          return staff;
        });

        return {
          ...attendanceData,
          staffArray: updatedStaffArray,
        };
      });

      // Then make the API call to update the backend
      await handleSaveAttendance(staffId);
    }
  };

  const handleSaveAttendance = async (selectedStaffId) => {
    // Filter out only the selected staff member
    const selectedStaff = attendanceData.staffArray.find(
      (staff) => staff.staffid === selectedStaffId
    );

    if (selectedStaff) {
      console.log("Selected staff data:", selectedStaff);

      try {
        // Create a new object with only the selected staff
        const selectedStaffData = {
          staffArray: [selectedStaff],
          date: attendanceData.date,
        };

        // Make the API call with the filtered data
        const response = await storeStaffAttendance(selectedStaffData);
        console.log("API response:", response.message);
        // Optionally handle success or inform the user
      } catch (error) {
        console.error("Error saving attendance:", error);
        // Handle error or inform the user
      }
    }
  };

  // const handleSaveAttendence = async () => {

  //   console.log("att",attendanceData)
  //   const response = await storeStaffAttendance(attendanceData);
  //   console.log(response.message);
  // };

  const isPastDate = (year, month, day) => {
    const currentDate = new Date();
    const selectedDate = new Date(year, month, day);

    return currentDate < selectedDate;
  };
  const isPastMonth = (year, month) => {
    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfSelectedMonth = new Date(year, month, 1);

    return firstDayOfCurrentMonth > firstDayOfSelectedMonth;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="pickerWrapper mb-5">
        <div className="headerDate">
          <button
            onClick={prevMonth}
            disabled={minDate?.getTime() > getTimeFromState(1)}
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <p className="month-name">
            {monthNames[currentMonth]} {currentYear}
          </p>
          <button
            onClick={nextMonth}
            disabled={
              maxDate?.getTime() <
              getTimeFromState(getNumberDaysInMonth(currentYear, currentMonth))
            }
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        </div>
        <div className="bodyDate">
          <div className="sevenColGrid">
            {getSortedDays(currentYear, currentMonth).map((day) => (
              <p key={day} className="month-days">
                {day}
              </p>
            ))}
          </div>
          <div className="sevenColGrid" onClick={handleSelectedDate}>
            {range(1, getNumberDaysInMonth(currentYear, currentMonth) + 1).map(
              (day) => (

                <p
                  key={day}
                  id="day"
                  data-day={day}
                  className={`
                  ${selectedDate?.getTime() ===
                      new Date(currentYear, currentMonth, day).getTime()
                      ? "active"
                      : ""
                    } 
                  ${day === new Date().getDate()
                      ? currentMonth === new Date().getMonth()
                        ? "current-date"
                        : ""
                      : ""
                    }
                  ${isPastDate(currentYear, currentMonth, day)
                      ? "pastDate"  // Set opacity 0.7 for dates from tomorrow
                      : ""
                    }`}


                >
                  {day}
                </p>
              )
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Oval
          height={40}
          width={40}
          color="#333333"
          wrapperStyle={{ textAlign: "center" }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#B5B5B5"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <div>
          <div className="flex mt-5 mb-5 search-teacher">
            <div className="search-div rounded-lg">
              <input
                className="search-teacher-input"
                type="text"
                placeholder="Search Teacher"
              />
              <CiSearch className="search-icon-teacher" />
            </div>
            <CiCircleInfo className="icon-teacher-serach" />
          </div>
          <div className="table-teacher">
            {attendanceData.staffArray.map((staff) => (
              <div key={staff.staffid} className="single-card">
                <div className="card-namings">
                  <p>{staff.name}</p>
                  <p>{staff.staffid}</p>
                </div>
                <div className={`attendance-button ${staff.isPresent ? "" : "color-red"}  ${isPastMonth(currentYear, currentMonth)
                    ? "pastDate"  // Set opacity 0.7 for dates from tomorrow
                    : ""
                  } `} onClick={() => handleAction(staff.staffid)}>
                  {staff.isPresent ? "Present" : "Absent"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
