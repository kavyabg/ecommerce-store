import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/api";

const useAdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginApi(formData);

      // Only allow admin role
      if (data.role !== "admin") {
        setError("Access denied: Admins only");
        return;
      }

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userRole", data.role);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    formData,
    error,
    handleChange,
    handleLogin,
  };
};

export default useAdminLogin;
