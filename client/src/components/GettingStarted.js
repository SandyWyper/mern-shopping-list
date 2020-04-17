import React from 'react';
import RegisterModel from './auth/RegisterModel';
import LoginModel from './auth/LoginModel';

export default function GettingStarted() {
  return (
    <div className="text-center">
      <h1>
        Welcome to <span className="text-primary">Shopping-lists</span>.
      </h1>
      <div className="d-flex justify-content-center">
        <h3>
          <RegisterModel />
        </h3>
        <h3 style={{ padding: '0.5rem 0' }}>or</h3>
        <h3>
          <LoginModel />
        </h3>
        <h3 style={{ padding: '0.5rem 0' }}>to get started.</h3>
      </div>
    </div>
  );
}
