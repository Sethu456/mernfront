import React, { useState, useEffect } from "react";
import axios from "axios";
import MyForm from "../component/studentForm";
import DataTable from "../component/table";

export default function Student() {
  const [data, setData] = useState([]);
  const [editID, setEditID] = useState();
  const [FormSubmitted, setFormSubmitted] = useState(0);

  useEffect(() => {
    fetchStudentData();
  }, [FormSubmitted]);

  const fetchStudentData = async () => {
    const res = await axios.get("https://mernback-8kt9.onrender.com/api/student");
    setData(res.data);
  };

  const handleClickEdit = (row_id) => {
    setEditID(row_id);
    console.log("<<<<<Edit ID>>>>>", row_id);
  };

  const handleClickDelete = async (row_id) => {
    console.log("<<<<<Click Delete ID>>>>>", row_id);
    // Display a confirmation dialog
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (userConfirmed) {
      const response = await axios
        .delete(`https://mernback-8kt9.onrender.com/api/student/${row_id}`)
        .then((response) => {
          console.log("Record edited:", response.data);
        })
        .catch((error) => {
          console.error("Error >>>>:", error);
        });
    } else {
      // If the user cancels, you can provide feedback or take other actions
      console.log("Delete operation canceled by the user.");
    }
    setFormSubmitted((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Details</h1>
      <MyForm editID={editID} setFormSubmitted={setFormSubmitted} />
      <DataTable
        data={data}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
    </div>
  );
}
