// src/hooks/useUserList.js
import { useEffect, useState } from "react";
import { fetchUserLists } from "../../services/admin/api.js";

export function useUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUserLists();
        if (!data || data.length === 0) {
          setError("No users found.");
        } else {
          setUsers(data);
        }
      } catch (err) {
        console.error("Error fetching user list:", err);
        setError("Failed to load user list.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, loading, error };
}
