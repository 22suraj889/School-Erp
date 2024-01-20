import React, { useState, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import {
  getSpecificTeacherDataFromDd,
  searchUser,
} from "../api/TeacherMaster/AddTeacher";
import { getSpecificStudentDataFromDd } from "../api/StudentMaster/AddStudentDirectly";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { GoArrowUpLeft } from "react-icons/go";

function SearchComponent() { 
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState({
    students: [],
    teachers: [],
  });
  const [resultData, setresultData] = useState({});
  const navigate = useNavigate();

  const searchContainerRef = useRef(null);

  const debouncedSearch = debounce(async (term) => {
    try {
      const trimmedTerm = term.trim();
      if (trimmedTerm.length >= 2) {
        const lowercaseTerm = trimmedTerm.toLowerCase();
        const results = await searchUser(lowercaseTerm);
        setShow(true);
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error Searching data");
    }
  }, 100);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleStudentItemClick = async (docId) => {
    const response = await getSpecificStudentDataFromDd(docId);
    setresultData(response);
    navigate(`/searchresult/${docId}`, {
      state: { resultData: response, who: "student" },
    });
    setSearchTerm("");
    setShow(false);
  };

  const handleTeacherItemClick = async (docId) => {
    const response = await getSpecificTeacherDataFromDd(docId);
    setresultData(response);
    navigate(`/searchresult/${docId}`, {
      state: { resultData: response, who: "teacher" },
    });
    setSearchTerm("");
    setShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchContainerRef}>
      <input
        className="text-center py-1 pr-[2.5rem] pl-1 rounded-md"
        type="text"
        placeholder="Search Student/Teacher"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="search-icon">
        <FaSearch />
      </div>
      {show && (
        <div className="search-show">
          <ul>
            {searchResults.students.map((student) => (
              <li
                key={student.id}
                onClick={() => handleStudentItemClick(student.id)}
              >
                <div>
                  <span className="roles">{student.firstName}</span>
                  <span className="ids ml-2">({student.studentId})</span>
                </div>
                <div className="role">
                  <span className="names text-lightGray ml-2">Student</span>
                  <GoArrowUpLeft />
                </div>
              </li>
            ))}
          </ul>

          <ul>
            {searchResults.teachers.map((teacher) => (
              <li
                key={teacher.id}
                onClick={() => handleTeacherItemClick(teacher.id)}
              >
                <div>
                  <span className="roles">{teacher.firstName}</span>
                  <span className="ids ml-2">({teacher.teacherId})</span>
                </div>
                <div className="role">
                  <span className="names text-lightGray ml-2">Teacher</span>
                  <GoArrowUpLeft />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
