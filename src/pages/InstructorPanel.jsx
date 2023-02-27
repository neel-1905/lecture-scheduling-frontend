import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
import PrivateRoute from "../context/PrivateRoute";

const InstructorPanel = () => {
  const location = useLocation();

  console.log(location.state.id);

  const [lectureData, setLectureData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/users/getAllUserLectures/${location.state.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );

        const formatRes = await res.json();

        if (!formatRes?.isSuccess) {
          throw new Error(formatRes?.message);
        }

        // alert(formatRes?.message);
        setLectureData(formatRes?.lectures);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  return (
    <>
      <PrivateRoute>
        <h1 className="text-center">Instructor Panel</h1>
        <div className="d-flex justify-content-center ">
          <table className="table table-dark w-75 ">
            <thead>
              <tr>
                <th colSpan="3" className="text-center">
                  Lectures
                </th>
              </tr>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col" className="text-center">
                  Subject
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                {/* <th scope="col" className="text-center">
                Handle
              </th> */}
              </tr>
            </thead>
            <tbody>
              {lectureData.map((item, index) => (
                <tr key={index}>
                  <th scope="row" className="text-center">
                    1
                  </th>
                  <td className="text-center">{item.subject}</td>
                  <td className="text-center">{item.date}</td>
                  {/* <td className="text-center">@mdo</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PrivateRoute>
    </>
  );
};

export default InstructorPanel;
