// src/hooks/useLogin.js
import { useState } from "react";
import { login as loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);
      setResponseData(data);

      // Dispatch login to Redux store
      dispatch(login(data));

      // Redirect after successful login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, responseData };
}
