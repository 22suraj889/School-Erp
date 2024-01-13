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
      if (trimmedTerm) {
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
                className="bg-[#888787] border rounded-lg p-2 my-2 cursor-pointer"
                onClick={() => handleStudentItemClick(student.id)}
              >
                <span className="font-bold">{student.firstName}</span> -
                <span className="text-white ml-2">({student.studentId})</span>
                <span className="text-sm text-lightGray ml-2">Student</span>
              </li>
            ))}
          </ul>

          <ul>
            {searchResults.teachers.map((teacher) => (
              <li
                key={teacher.id}
                className="bg-[#888787] border rounded-lg p-2 my-2 cursor-pointer"
                onClick={() => handleTeacherItemClick(teacher.id)}
              >
                <span className="font-bold">{teacher.firstName}</span>
                <span className="text-white ml-2">({teacher.teacherId})</span>
                <span className="text-sm text-lightGray ml-2">Teacher</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
