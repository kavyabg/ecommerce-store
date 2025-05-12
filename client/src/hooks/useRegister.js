// src/hooks/useRegister.js
import { useState } from "react";
import { register as registerUser } from "../services/api";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const register = async (formData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const data = await registerUser(formData);
      setResponseData(data);
      setSuccess(true);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success, responseData };
}
