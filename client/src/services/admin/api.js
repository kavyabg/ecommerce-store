const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUserLists = async () => {
  const response = await fetch(`${BASE_URL}/userlist`);
  const text = await response.text(); // Read as text first
  console.log("Response Text:", text); // Log the response to debug

  try {
    const data = JSON.parse(text); // Parse the response to JSON
    return data;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Failed to parse response as JSON.");
  }
};
