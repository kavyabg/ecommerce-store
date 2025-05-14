const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUserLists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/userlist`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw new Error("Failed to fetch or parse user list.");
  }
};
