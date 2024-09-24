// SignUp.js
import React from 'react';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const SignUp = () => {
  const { register } = useKindeAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-700 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <button
          onClick={register}
          className="bg-blue-600 px-4 py-2 rounded-md text-white"
        >
          Register with Kinde
        </button>
      </div>
    </div>
  );
};

export default SignUp;
