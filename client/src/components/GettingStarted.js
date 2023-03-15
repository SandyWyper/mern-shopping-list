import React from "react";
import RegisterModel from "./auth/RegisterModel";
import LoginModel from "./auth/LoginModel";

export default function GettingStarted() {
  return (
    <div className="row">
      <div className="col-md">
        <h1 className="text-center mt-5">
          Your
          <br />
          Lists
        </h1>
      </div>
      <div className="col-md d-flex mt-5 welcome-message">
        <h3 className="d-flex flex-wrap justify-content-center mt-md-4">
          <RegisterModel />
          <span style={{ padding: "0.5rem 0", color: "var(--color-green)" }}>
            or
          </span>
          <LoginModel />
          <span style={{ padding: "0.5rem 0", color: "var(--color-green)" }}>
            to get started.
          </span>
        </h3>
      </div>
    </div>
  );
}
