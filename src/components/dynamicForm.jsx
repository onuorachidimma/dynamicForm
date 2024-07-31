import React, { useState, useEffect } from "react";
import ModalComponent from "./modal";
import "../components/styles.css";

const DynamicForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!value || value.length < 3) {
          newErrors.name = "Name must be at least 3 characters long";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailPattern.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        const passwordPattern = /^(?=.*[0-9]).{8,}$/;
        if (value.length < 8 || !passwordPattern.test(value)) {
          newErrors.password =
            "Password must be at least 8 characters long and contain a number";
        } else {
          delete newErrors.password;
        }
        if (confirmPassword && value !== confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  const handleInputChange = (setter, field) => (e) => {
    const { value } = e.target;
    setter(value);
    validateField(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateField("name", name);
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);

    if (isValid) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <div className="formContainer">
      <h2 className="header">Dynamic Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputAndErrorContainer">
          <input
            type="text"
            value={name}
            onChange={handleInputChange(setName, "name")}
            placeholder="Name"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div className="inputAndErrorContainer">
          <input
            type="email"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            placeholder="Email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div className="inputAndErrorContainer">
          <input
            type="password"
            value={password}
            onChange={handleInputChange(setPassword, "password")}
            placeholder="Password"
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div className="inputAndErrorContainer">
          <input
            type="password"
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword, "confirmPassword")}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
        </div>

        <div className="submitButton">
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>

      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        name={name}
        email={email}
      />
    </div>
  );
};

export default DynamicForm;
