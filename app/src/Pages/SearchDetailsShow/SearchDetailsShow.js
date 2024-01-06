import React from "react";
import { useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import TextNameComponent from "../../Components/TextNameComponent";
import "./SearchDetails.css";
import svgImage from "./add.png";
import Classes  from "../../Database/Classes";

const SearchDetailsShow = () => {
  const months = ['January', 'February', 'March'];
  const data = [
    { text: 'VII - A - Maths(586)', id: 1 },
    { text: 'X - B - Maths(586)', id: 2 },
    { text: 'X - C - Maths(586)', id: 3 },
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
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    const dd = String(randomDate.getDate()).padStart(2, '0');
    const mm = String(randomDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const yyyy = randomDate.getFullYear();
  
    return `${dd}-${mm}-${yyyy}`;
  };
  
  const data2 = ['Relative Velocity', 'Velocity', 'Rotational Velocity', 'Speed', 'Speed'];
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
              <TextNameComponent head="Mobile No." disc={resultData.mobileNo} />
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
          <div className="profile-container">
            {resultData.profilePic && (
              <img
                src={resultData.profilePic}
                alt={`${resultData.firstName} ${resultData.lastName}`}
                className="profile-img-search-details"
              />
            )}
          </div>
          <div>
          </div>
        </div>
        {who === "student" && (
    <div>
      <div className="Fees">
        <div>
          <div className="fees-section">
            <div className="fees-container">
              <h3 className="fees-text">Application Fees</h3><button className="option-button">Receipt</button>
            </div>
            <div className="fees-container">
              <h3 className="fees-text-2">Admission Fees</h3><button className="pay-button ">Take Fees</button>
            </div>
          </div>
       </div>
       <div className="fees-section">
        <div className="fees-container">
              <h2 className="Regular-Fees">Regular Fees</h2>
              <p className="mode">Annually</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={isChecked1} onChange={handleToggle1} />
                <span className="slider round"></span>
                </label>
              <p className="mode">Monthly</p>
              <hr></hr>
        </div>
        <div>
          <br></br>
          <hr></hr>
        <div>
        {months.map((month, index) => (
        <div key={index} className="flex">
          <p className="month w-1/5">{month}</p>
          <button className="pay-button w-4/5">Take Fees</button>
        </div>
      ))}
        </div>
        </div>
       </div>
       <div className="fees-section">
        <div className="fees-container">
              <h2 className="Regular-Fees">Transport Fees</h2>
              <p className="mode">Annually</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={isChecked2} onChange={handleToggle2} />
                <span className="slider round"></span>
                </label>
              <p className="mode">Monthly</p>
              <hr></hr>
        </div>
        <div>
          <br></br>
          <hr></hr>
          {months.map((month, index) => (
        <div key={index} className="flex">
          <p className="month w-1/5">{month}</p>
          <button className="pay-button w-4/5">Take Fees</button>
        </div>
      ))}
        </div>
      </div>
    </div>
    <div className="marks-section">
        <div className="marks-container">
          <div className="marks-container">
            <h3 className="downloads-1">Marks Card</h3><button className="option-button">Download</button>
          </div>
          <div className="marks-container">
            <h3 className="downloads-1">Hall Ticket</h3><button className="option-button">Download</button>
          </div>
        </div>
        <div className="marks-container">
          <div className="marks-container">
              <h3 className="downloads">Previous year Data</h3><button className="option-button">Download</button>
          </div>
          <div className="marks-container">
              <h3 className="downloads">No Due Certificate</h3><button className="option-button">Download</button>
          </div>
       </div>
    </div>
    <div className="ExamAttendance">
        <div className="exam-section">
          <h3 className="exam">Exam wise Grades</h3>
            <hr></hr>
            {months.map((month, index) => (
        <div key={index} className="flex">
          <p className="month w-1/5">{month}</p>
          <button className="pay-button w-4/5">Check</button>
        </div>
      ))}
         
        </div>
    </div>
   
  </div> )}
   {who !== "student" && (
    <div className="Teacher">
      <div className="Fees2">
        <div>
          <div className="fees-section2">
          <div className="flex">
              <h2>Assign Classes</h2>
              <img src={svgImage} alt="SVG Image" />
            </div>
              <hr></hr>
              <br></br>
              {data.map(item => (
        <div key={item.id} className="flex items-center">
          <h1 className="border pl-3 flex-grow">{item.text}</h1>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-full cursor-pointer ml-2 w-1/5"
          >
            X
          </button>
        </div>
      ))}
          </div>
       </div>
       <div className="fees-section">
        <div className="fees-container">
              <h2 className="Regular-Fees">Syllabus Completed</h2>
              <hr></hr>
        </div>
        <div>
          <br></br>
          <hr></hr>
          <div className="Month">
          {data2.map((item, index) => (
        <div key={index} className="flex items-center">
          <h1 className="border pl-3 flex-grow">{item}</h1>
          <span className="pl-3">{getRandomDate()}</span>
        </div>
      ))}
          </div>
        </div>
       </div>
       <div className="fees-section">
        <div className="fees-container">
              <h2 className="Regular-Fees">Salary Payments</h2>
              <hr></hr>
        </div>
        <div>
        {months.map((month, index) => (
        <div key={index} className="flex">
          <p className="month w-1/5">{month}</p>
          <button className="pay-button w-4/5">Take Fees</button>
        </div>
      ))}
          </div>
        <div>
          <br></br>
          <hr></hr>
        </div>
      </div>
    </div>
    </div>)}
      </div>
      )}
    </div>
    
  );
};

export default SearchDetailsShow;
