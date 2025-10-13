import React from "react";
import "./style.css"; // Import your CSS file

const Table = ({ data, handleClickEdit, handleClickDelete }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
           
            <th>Twine</th>
            <th>Spec</th>
            <th>Colour</th>
            <th>Weight(Kg)</th>
            <th>Date</th>
             <th>ID</th>
             <th>Action</th>
          
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
             
              
              <td>{row.name}</td>
              <td>{row.address}</td>
              <td>{row.gender}</td>
              <td>{row.phoneNum}</td>
              <td>{row.dateOfBirth}</td>
              <td>{row._id}</td>
               <td>
                <button
                style={{ marginRight: '8px' }}
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









