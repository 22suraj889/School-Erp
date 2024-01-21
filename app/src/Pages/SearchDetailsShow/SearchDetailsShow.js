import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import TextNameComponent from "../../Components/TextNameComponent";
import "./SearchDetails.css";
import download from "./download.png";
import Add from "./9.png";
import Remove from "./remove.png";
import ButtonComponent from "../../Components/ButtonComponent";

const SearchDetailsShow = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);

  // Get weekdays and days for current month
  const month = useMemo(() => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const days = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    while (date.getMonth() === currentMonth.getMonth()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return { month: currentMonth, days, weekdays };
  }, [currentMonth]);

  const months = ["January", "February", "March"];
  const data = [
    "VII - A - Maths(586)",
    "X - B - Maths(586)",
    "X - C - Maths(586)",
  ];
  const { id } = useParams();
  const location = useLocation();
  const { resultData } = location.state || {};
  const who = location.state?.who || " ";
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const getRandomDate = () => {
    const start = new Date(2000, 0, 1); // Choose your start date
    const end = new Date(); // Use the current date as the end date
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    const dd = String(randomDate.getDate()).padStart(2, "0");
    const mm = String(randomDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const yyyy = randomDate.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  const data2 = ["Relative Velocity", "Velocity", "Rotational Velocity"];
  const handleToggle1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
  };

  console.log(resultData);

  return (
    <div>
      {resultData && (
        <div>
          <div className="search-wrapper-details">
            <div className="view-edit-div">
              <div><ButtonComponent buttonText={"View/Edit Full Data"} onClickButton={() => {console.log(who, id)}} isUpdateDisabled={false} /></div>
              <div className="search-container-details">
                <div className="search-wrapper">
                  <TextNameComponent
                    head="Name"
                    disc={`${resultData.firstName} ${resultData.lastName}`}
                  />
                  <TextNameComponent
                    head="Class"
                    disc={
                      who === "student"
                        ? resultData.joiningClass
                        : resultData.classTeacher
                    }
                  />
                  <TextNameComponent
                    head="Mobile No."
                    disc={resultData.mobileNo}
                  />
                  <TextNameComponent
                    head="Year joined"
                    disc={
                      who === "student"
                        ? resultData.admissionDate
                        : resultData.experienceDetails.joiningDate
                    }
                  />
                </div>
                <div className="search-wrapper">
                  <TextNameComponent
                    head={who === "student" ? "StudentId" : "TeacherId"}
                    disc={
                      who === "student"
                        ? resultData.studentId
                        : resultData.teacherId
                    }
                  />
                  <TextNameComponent
                    head="Transport Slab"
                    disc={resultData.transportSlab}
                  />
                  <TextNameComponent
                    head={who === "student" ? "Fee Slab" : "Designation"}
                    disc={
                      who === "student"
                        ? resultData.feeslab
                        : resultData.designation
                    }
                  />
                  <TextNameComponent
                    head="Section"
                    disc={
                      who === "student"
                        ? resultData.joiningClass
                        : resultData.assignClasses?.class || "N/A"
                    }
                  />
                </div>
              </div>
            </div>
            <div className="profile-container">
              {resultData.profilePic && (
                <img
                  src={resultData.profilePic}
                  alt={`${resultData.firstName} ${resultData.lastName}`}
                  className="profile-img-search-details"
                />
              )}
            </div>
            <div></div>
          </div>
          {who === "student" && (
            <div>
              <div className="Fees">
                <div>
                  <div className="fees-section">
                    <div className="fees-container">
                      <h3 className="fees-text">Application Fees</h3>
                      <div className="Adding flex">
                        <img
                          src={download}
                          alt="Downward Arrow"
                          className="arrow-image"
                        />
                        <button className="option-button">Receipt</button>
                      </div>
                    </div>
                    <div className="fees-container">
                      <h3 className="fees-text-2">Admission Fees</h3>
                      <button className="pay-button ">Take Fees</button>
                    </div>
                  </div>
                </div>
                <div className="fees-section">
                  <div className="fees-container">
                    <h2 className="Regular-Fees">Regular Fees</h2>
                    <p className="mode mr-1"> Annually </p>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={isChecked1}
                        onChange={handleToggle1}
                      />
                      <span className="slider round"></span>
                    </label>
                    <p className="mode ml-1">Monthly</p>
                    <hr></hr>
                  </div>
                  <div>
                    <br></br>
                    <hr></hr>
                    <div>
                      {months.map((month, index) => (
                        <div key={index} className="flex">
                          <p className="month w-1/2">{month}</p>
                          <button className="pay-button w-4/5">
                            Take Fees
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="fees-section">
                  <div className="fees-container">
                    <h2 className="Regular-Fees">Transport Fees</h2>
                    <p className="mode mr-1">Annually</p>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={isChecked2}
                        onChange={handleToggle2}
                      />
                      <span className="slider round"></span>
                    </label>
                    <p className="mode ml-1">Monthly</p>
                    <hr></hr>
                  </div>
                  <div>
                    <br></br>
                    <hr></hr>
                    {months.map((month, index) => (
                      <div key={index} className="flex">
                        <p className="month w-1/2">{month}</p>
                        <button className="pay-button w-4/5">Take Fees</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="marks-section">
                <div className="marks-container">
                  <div className="marks-container">
                    <h3 className="downloads-1 ">Marks Card</h3>
                    <div className="hallticket flex">
                      <img
                        src={download}
                        alt="Downward Arrow"
                        className="arrow-image"
                      />
                      <button className="option-button ">Download</button>
                    </div>
                  </div>
                  <div className="marks-container ml-7">
                    <h3 className="downloads-1">Hall Ticket</h3>
                    <div>
                      <div className="hallticket flex">
                        <img
                          src={download}
                          alt="Downward Arrow"
                          className="arrow-image"
                        />
                        <button className="option-button ">Download</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="marks-container">
                  <div className="marks-container">
                    <h3 className="downloads">Previous year Data</h3>
                    <div className="hallticket flex">
                      <img
                        src={download}
                        alt="Downward Arrow"
                        className="arrow-image"
                      />
                      <button className="option-button ">Download</button>
                    </div>
                  </div>
                  <div className="marks-container  ml-5">
                    <h3 className="downloads">No Due Certificate</h3>
                    <div className="hallticket flex">
                      <img
                        src={download}
                        alt="Downward Arrow"
                        className="arrow-image"
                      />
                      <button className="option-button ">Download</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ExamAttendance flex">
                <div className="exam-section w-1/2">
                  <h3 className="exam">Exam wise Grades</h3>
                  <hr></hr>
                  {months.map((month, index) => (
                    <div key={index} className="flex">
                      <p className="month w-1/5">{month}</p>
                      <button className="pay-button w-4/5">Check</button>
                    </div>
                  ))}
                </div>
                <div className="Classes  w-1/2 flex mt-4 pb-10">
                  <div className="calendar ml-5">
                    <div className="flex mt-5">
                      <p className="mr-10">Attendance </p>
                      <p className="mr-10">
                        Present % - <span className="text-green-500">90</span>{" "}
                      </p>
                      <p>Attended Days- 4</p>
                    </div>
                    <hr className="border-gray-200 border-1.2 ml-2 mr-2 mt-1"></hr>
                    <div className="mt-5 ml-5 border border-gray-200 ">
                      <Header
                        currentMonth={month.month}
                        onMonthChange={(month) => setCurrentMonth(month)}
                      />

                      <div className="calendar-body">
                        <Weekdays weekdays={month.weekdays} />

                        <Dates days={month.days} currentMonth={month.month} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {who !== "student" && (
            <div className="ml-7">
              <div className="flex justify-between">
                <div className="Classes w-1/3">
                  <div className="Part-1 flex">
                    <h1 className="flex-1">Assign Classes</h1>
                    <img src={Add} className="addbutton flex-end" />
                  </div>
                  <hr className="border-gray-200 border-1.2 ml-2 mr-2"></hr>
                  {data.map((data, index) => (
                    <div key={index} className="flex ml-2">
                      <p className="month w-4/5 ml-4 border">{data}</p>
                      <img className="Remove" src={Remove} />
                    </div>
                  ))}
                  <br></br>
                </div>

                <div className="Classes w-1/3 ">
                  <h1 className="mt-3 text-center ml-2">Syllabus Completed</h1>
                  <hr className="border-gray-200 border-1.2 ml-2 mr-2 mt-2"></hr>
                  {data2.map((data, index) => (
                    <div key={index} className="flex ml-5">
                      <p className="month w-3/5 ml-4 border">{data}</p>
                      <p className="text-xs w-2/5 mt-6 ml-1">20-03-2024</p>
                    </div>
                  ))}
                  <br></br>
                </div>

                <div className="Classes w-1/3 ">
                  <h1 className="mt-3 text-center ml-2">Salary Payments</h1>
                  <hr className="border-gray-200 border-1.2 ml-2 mr-2 mt-1"></hr>
                  {months.map((month, index) => (
                    <div key={index} className="flex ml-2">
                      <p className="month w-2/5 ml-2">{month}</p>
                      <button className="pay-button2 w-3/5 mr-5">120000</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="Classes  w-1/2 flex mt-10 ml-10 pb-10">
                <div className="calendar ml-10">
                  <div className="flex mt-5">
                    <p className="mr-10">Attendance </p>
                    <p className="mr-10">
                      Present % - <span className="text-green-500">90</span>{" "}
                    </p>
                    <p>Attended Days- 4</p>
                  </div>
                  <hr className="border-gray-200 border-1.2 ml-2 mr-2 mt-1"></hr>
                  <div className="mt-5 ml-5 border border-gray-200 ">
                    <Header
                      currentMonth={month.month}
                      onMonthChange={(month) => setCurrentMonth(month)}
                    />

                    <div className="calendar-body">
                      <Weekdays weekdays={month.weekdays} />

                      <Dates days={month.days} currentMonth={month.month} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <br></br>
      <br></br>
    </div>
  );
};

export default SearchDetailsShow;
function Header({ currentMonth, onMonthChange }) {
  return (
    <div className="flex justify-between mb-5">
      <button
        className="px-3 py-1 rounded text-sm"
        onClick={() =>
          onMonthChange(currentMonth.setMonth(currentMonth.getMonth() - 1))
        }
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <h2 className="text-2xl font-bold">
        {currentMonth.toLocaleString("default", { month: "long" })}
      </h2>

      <button
        className="px-3 py-1 rounded text-sm"
        onClick={() =>
          onMonthChange(currentMonth.setMonth(currentMonth.getMonth() + 1))
        }
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

function Weekdays({ weekdays }) {
  return (
    <div className="flex">
      {weekdays.map((day) => (
        <div key={day} className="flex-1 text-center text-xs">
          {day}
        </div>
      ))}
    </div>
  );
}

function Dates({ days, currentMonth }) {
  return (
    <div className="grid grid-cols-7">
      {days.map((day) => {
        const date = day.getDate();
        const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

        return (
          <div
            key={date}
            className={`col-span-1 p-1 text-center ${
              !isCurrentMonth ? "text-gray-400" : ""
            }`}
          >
            <p
              className={`${
                day.toDateString() === new Date().toDateString()
                  ? "text-blue-500"
                  : ""
              }`}
            >
              {date}
            </p>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}
function ChevronLeftIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
