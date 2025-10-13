import React, { useState } from "react";
import "./style.css";

const Table = ({ data, handleClickEdit, handleClickDelete }) => {
  const [filterDate, setFilterDate] = useState("");

   const filteredData = filterDate
    ? data.filter(
        (row) =>
          new Date(row.dateOfBirth).toISOString().split("T")[0] === filterDate
      )
    : data;

  return (
    <div className="table-container">
      {/* Date filter input */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Filter by Date:{" "}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Twine</th>
            <th>Spec</th>
            <th>Colour</th>
            <th>Weight(Kg)</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.address}</td>
              <td>{row.gender}</td>
              <td>{row.phoneNum}</td>
              <td>{new Date(row.dateOfBirth).toLocaleDateString("en-GB")}</td>
             
              <td>
                <button
                  style={{ marginRight: "8px" }}
                  size="small"
                  variant="outlined"
                  onClick={() => handleClickEdit(row._id)}
                >
                  Edit
                </button>
                <button
                  size="small"
                  variant="outlined"
                  onClick={() => handleClickDelete(row._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;


