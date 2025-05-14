import { useState, useEffect } from "react";
import { getUserByEmail } from "../services/api";
import { useSelector } from "react-redux";

export const useUserByEmail = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.email) {
          throw new Error("User email not found in localStorage");
        }
        const data = await getUserByEmail(user.email);
        setUserData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.email]);

  return { userData, loading, error };
};
