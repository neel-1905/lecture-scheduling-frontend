import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "../context/PrivateRoute";

const AddCourse = () => {
  const [course, setCourse] = useState("");
  const [select, setSelect] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
    console.log(course);
  };

  useEffect(() => {
    console.log(select);
  }, [select]);

  const addCourse = async () => {
    try {
      const res = await fetch(
        "https://lecture-scheduling-backend.vercel.app/courses/createCourse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            courseName: course?.courseName,
            courseLevel: select,
            courseDescription: course?.courseDescription,
          }),
        }
      );

      const formatRes = await res.json();

      if (!formatRes?.isSuccess) {
        throw new Error(formatRes?.message);
      }

      alert(formatRes?.message);
      navigate("/adminPanel");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <PrivateRoute>
        <div
          style={{ height: "100vh", minHeight: "100dvh" }}
          className="container container-fluid d-flex justify-content-center align-items-center"
        >
          <form
            className="row g-3"
            onSubmit={(e) => {
              e.preventDefault();

              if (
                !course?.courseName ||
                !select ||
                !course?.courseDescription
              ) {
                alert("Please fill all the details");
              } else {
                addCourse();
              }
            }}
          >
            <h2>Add A Course</h2>
            <div className="col-md-6">
              <label htmlFor="courseName" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                className="form-control"
                id="courseName"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="courseLevel" className="form-label">
                Level
              </label>
              <select
                name="courseLevel"
                className="form-select"
                id="courseLevel"
                aria-label="Default select example"
                onChange={(e) => setSelect(e.target.value)}
              >
                <option selected disabled>
                  Select Course Level
                </option>
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="courseDesc" className="form-label">
                Course Description
              </label>
              <textarea
                onChange={handleChange}
                name="courseDescription"
                className="form-control"
                placeholder="Course Description ..."
                id="courseDesc"
                // style="height: 100px"
              ></textarea>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Add Course
              </button>
            </div>
          </form>
        </div>
      </PrivateRoute>
    </>
  );
};

export default AddCourse;
