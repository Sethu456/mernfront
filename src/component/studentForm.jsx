import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file

const MyForm = ({ editID, setFormSubmitted }) => {
  const initialValues = {
    name: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    phoneNum: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorsMessage, setErrorsMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    twine: "",
    spec: "",
    date: "",
    colour: "",
    kg: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (editID) {
      // Fetch data if editID is provided (edit mode)
      setIsEdit(true);
      fetchData(editID);
    } else {
      setIsEdit(false);
    }
  }, [editID]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `https://mernback-8kt9.onrender.com/api/student/${id}`
      );
      console.log("Record edited:", response.data);
      const date = new Date(response.data.dateOfBirth);
      const formattedDate = date.toLocaleDateString("en-US");
      const newData = { ...response.data, dateOfBirth: formattedDate };
      console.log("newData >>>>>", newData);
      setFormData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorsMessage(" ");
    // You can add validation here and update formErrors state accordingly
    validateField(name, value);
  };

  const validateField = (name, value) => {
    // Basic validation, you can customize this based on your requirements
    switch (name) {
      case "name":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name:
            value.length < 3 ? "twine must be at least 3 characters long" : "",
        }));
        break;
      case "address":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: value.length < 5 ? "spec is Require" : "",
        }));
        break;
      case "dateOfBirth":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: value.length === 0 ? "Date  is Require" : "",
        }));
        break;
      case "gender":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: value === "" ? "Colour is Require Please Select" : "",
        }));
        break;
      case "phoneNum":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name:
            value.length < 8
              ? "Weight is require"
              : "",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formErrors) {}   else {
    //   setErrorsMessage("Please enter all fields; all are required ");
    // }
    try {
      if (isEdit) {
        // Handle edit logic, make a PUT request
        const response = await axios
          .put(`https://mernback-8kt9.onrender.com/api/student/${editID}`, formData)
          .then((response) => {
            console.log("Record edited:", response.data);
            setSuccessMessage("Data Updated successfully!");
            setTimeout(() => {
              setSuccessMessage("");
            }, 6000);
            setFormData(initialValues);
            setIsEdit(false);
          })
          .then((error) => {
            console.error("Error:", error);
          });
      } else {
        const res = await axios
          .post("https://mernback-8kt9.onrender.com/api/student", formData)
          .then((res) => {
            console.log("crete", res.data);
            setSuccessMessage("Data submitted successfully!");
            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);
            setFormData(initialValues);
          })
          .then((error) => {
            console.error("Error:", error);
          });
      }

      setFormSubmitted((prev) => prev + 1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <label>
          {" "}
          twine:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <span className="error">{formErrors.name}</span>
        </label>

        <label>
          {" "}
          Spec:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <span className="error">{formErrors.address}</span>
        </label>
      </div>

      <div className="row">
        <label>
          {" "}
          Date:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <span className="error">{formErrors.dateOfBirth}</span>
        </label>

        <label>
          {" "}
          Colour:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Colour</option>
            <option value="White">White</option>
            <option value="Green">Green</option>
          </select>
          <span className="error">{formErrors.gender}</span>
        </label>
      </div>

      <div className="row">
        <label>
          {" "}
          Weight:
          <input
            type="number"
            name="phoneNum"
            value={formData.phoneNum}
            onChange={handleChange}
          />
          <span className="error">{formErrors.phoneNum}</span>
        </label>
      </div>

      <button type="submit">{isEdit ? "Update" : "Create"}</button>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorsMessage && <div className="error">{errorsMessage}</div>}
    </form>
  );
};

export default MyForm;







