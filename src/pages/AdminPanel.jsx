import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PrivateRoute from "../context/PrivateRoute";

const AdminPanel = () => {
  const [instructors, setInstructors] = useState([]);

  console.log(instructors);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://lecture-scheduling-backend.vercel.app/users/getAll",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );

        const formatRes = await res.json();
        // if (!formatRes?.isSucess) {
        //   throw new Error(formatRes?.message);
        // }
        // alert(formatRes?.message);
        setInstructors(formatRes?.users);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  return (
    <>
      <PrivateRoute>
        <Navbar />
        <div className="d-flex justify-content-center ">
          <table className="table table-dark w-75 ">
            <thead>
              <tr>
                <th colSpan="4" className="text-center">
                  Lectures
                </th>
              </tr>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center">
                  Email
                </th>
                <th scope="col" className="text-center"></th>
                {/* <th scope="col" className="text-center">
                Handle
              </th> */}
              </tr>
            </thead>
            <tbody>
              {instructors.map((item, index) => (
                <tr key={index}>
                  <th scope="row" className="text-center">
                    {index + 1}
                  </th>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">
                    <Link to="/createLecture" state={{ id: item._id }}>
                      <button className="btn btn-primary">Set Lecture</button>
                    </Link>
                  </td>
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

export default AdminPanel;
