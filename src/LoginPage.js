import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    sendLoginData(loginData);
  }
  function sendLoginData(loginData) {
    const jsonData = JSON.stringify(loginData);

    axios
      .post("http://127.0.0.1:5000", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(
          "Login submitted successfully:",
          response.statusText,
          response.data
        );
        SuccessMessage();
      })
      .catch((error) => {
        console.error("Error submitting login:", error);
        setErrorMessage("Error submitting data");
      });
  }

  function SuccessMessage() {
    alert("Login submitted succesfully");
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="login"
        placeholder="Enter your login"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
        required
      />
      <input type="submit" placeholder="Submit" />
    </form>
  );
  if (submitted) {
    return (
      <div>
        <div className="mt-5">{form}</div>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </div>
    );
  } else {
    return <div className="mt-5">{form}</div>;
  }
}
