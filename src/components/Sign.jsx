// SignIn.js
import React, { useState } from 'react';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const SignIn = () => {
  const { login } = useKindeAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-700 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Sign In</h2>
        <button
          onClick={login}
          className="bg-green-600 px-4 py-2 rounded-md text-white"
        >
          Log In with Kinde
        </button>
      </div>
    </div>
  );
};

export default SignIn;
