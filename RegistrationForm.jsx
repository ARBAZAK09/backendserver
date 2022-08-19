import React, { useState, useEffect } from "react";
// import { database } from "../Firebase/firebase";
// import { ref, push, child, get, update } from "firebase/database";
import { Captcha } from "./Captcha";
import "./RegistrationForm.css";
import Swal from "sweetalert";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const RegistrationForm = (props) => {
  const initialvalues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  const [issubmit, setissubmit] = useState(false);
  const history = useHistory("");
  const [errormessage, seterrormessage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setloading] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const redirectToLogin = () => {
    props.history.push("/Login");
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!values.firstName) {
      errors.firstName = "firstName is required!";
    } else if (!firstName.match(regName)) {
      errors.firstName = " This is not a valid Name format";
    }
    if (!values.lastName) {
      errors.lastName = "lastName is required!";
    } else if (!lastName.match(regName)) {
      errors.firstName = " This is not a valid Name format";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "confirmPassword is required";
    } else if (values.password !== confirmPassword) {
      errors.confirmPassword = "password and confirmpassword is not matching";
    }
    if (!values.contactNumber) {
      errors.contactNumber = "contactNumber is required";
    } else if (!values.contactNumber.length > 10) {
      errors.contactNumber = "contactNumber is short";
    } else if (!values.contactNumber.length < 10) {
      errors.contactNumber = "contactNumber is exceeding its limits";
    }

    return errors;
  };

  useEffect(() => {
    console.log(formerrors);
    if (Object.keys(formerrors).length === 0 && issubmit) {
      console.log(formvalues);
    }
  }, [formerrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setformerrors(validate(formvalues));
    axios
      .post("http://localhost:5000/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        contactNumber: contactNumber,
      })
      .then(() => {
        setloading(false);
        history.push("/RegistrationForm");
      })
      .catch((error) => {
        setloading(false);
        if (error.response.status === 401 || error.response.status === 400) {
          seterrormessage(error.response.data.message);
        } else {
          seterrormessage("something went wrong , please try again");
        }
        console.error("error>>>", error);
      });
    Swal("Submitted", "Submitted Successfully", "success");
    setTimeout(() => {
      history.push("./Login");
    }, 2000);
    setissubmit(true);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit} id="create-course-form">
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="firstName">
              First Name{" "}
            </label>
            <input
              className="form__input"
              type="text"
              name="firstName"
              required
              value={formvalues.firstName.trim()}
              onChange={handleInputChange}
              id="firstName"
              placeholder="First Name"    axios

            />
          </div>
          <p>{formerrors.firstName}</p>

          <div className="lastname">
            <label className="form__label" for="lastName">
              Last Name{" "}
            </label>
            <input
              qAs
              type="text"
              name="lastName"
              id="lastName"
              required
              value={formvalues.lastName.trim()}
              className="form__input"
              onChange={handleInputChange}
              placeholder="LastName"
            />
          </div>
          <p>{formerrors.lastName}</p>

          <div className="email">
            <label className="form__label" for="email">
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              required
              name="email"
              className="form__input"
              value={formvalues.email.trim()}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
          <p>{formerrors.email}</p>

          <div className="password">
            <label className="form__label" for="password">
              Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="password"
              name="password"
              required
              value={formvalues.password.trim()}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </div>
          <p>{formerrors.password}</p>

          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">
              Confirm Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formvalues.confirmPassword.trim()}
              onChange={handleInputChange}
              placeholder="Confirm Password"
            />
          </div>
          <p>{formerrors.confirmPassword}</p>

          <div className="contact-Number">
            <label className="form__label" for="contactNumber">
              Contact Number{" "}
            </label>
            <input
              className="form__input"
              type="number"
              id="contactNumber"
              name="contactNumber"
              value={formvalues.contactNumber.trim()}
              required
              onChange={handleInputChange}
              placeholder="contact Number"
            />
          </div>
          <p>{formerrors.contactNumber}</p>
        </div>
        <div>
          <Captcha />
        </div>

        <div class="footer">
          <button type="submit" id="succesBTN" class="btn btn-primary ml-1">
            Register
          </button>
          &nbsp;&nbsp;
          {/* <button
            type="reset"
            value="Reset"
            class="btn btn-primary ml-1"
            style={{ cursor: "pointer" }}
          >
            Reset
          </button> */}
          {errormessage || <div className="error">{errormessage}</div>}
        </div>
        <div className="mt-2">
          <span>Already have an account? </span>
          <span className="loginText" onClick={() => redirectToLogin()}>
            Login here
          </span>
        </div>
      </form>
    </div>
  );
};
