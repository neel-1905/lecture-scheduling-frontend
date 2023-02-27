import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "../context/PrivateRoute";

const CreateLecture = () => {
  const [lecture, setLectureData] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLectureData({ ...lecture, [e.target.name]: e.target.value });
    console.log(lecture);
  };

  const createLectue = async () => {
    try {
      const res = await fetch("http://localhost:5000/lectures/createLecture/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          subject: lecture?.subject,
          date: lecture?.date,
        }),
      });

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
          className="d-flex justify-content-center align-items-center container container-lg-fluid"
          style={{ minHeight: "100dvh", height: "100vh" }}
        >
          <form className=" col-lg-5 col-md-5 col-sm-10 ">
            <div className="loginHeader">
              <h2 className="mb-5">Schedule a Lecture</h2>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                type="text"
                name="subject"
                className="form-control"
                id="subject"
                placeholder="Subject"
              />
              <label htmlFor="username">Subject</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                type="date"
                name="date"
                className="form-control"
                id="date"
                placeholder="Date"
              />
              {/* <label htmlFor="password">Date</label> */}
            </div>

            <div className="loginBtn">
              <button className="btn btn-primary w-100">Submit</button>
            </div>
          </form>
        </div>
      </PrivateRoute>
    </>
  );
};

export default CreateLecture;
