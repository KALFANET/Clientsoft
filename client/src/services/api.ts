import axios from "axios";

const API_URL = "http://localhost:4000/api";

// 📌 פונקציה לשליפת ה-API Key מה-localStorage
const getAuthHeaders = () => {
  const apiKey = localStorage.getItem("AGENT_API_KEY");
  if (!apiKey) {
    console.warn("⚠️ No API Key found in localStorage.");
    return {};
  }
  return {
    Authorization: `Bearer ${apiKey}`,
  };
};

// 📌 קבלת רשימת מכשירים מהשרת
export const fetchDevices = async () => {
  try {
    console.log("📥 Fetching devices...");
    const response = await axios.get(`${API_URL}/devices`, { headers: getAuthHeaders() });

    if (!response.data || !Array.isArray(response.data.devices)) {
      console.error("⚠️ API response is not an array!", response.data);
      return [];
    }

    console.log("✅ Devices fetched successfully:", response.data.devices);
    return response.data.devices;
  } catch (error: any) {
    console.error("❌ Error fetching devices:", error.response?.data || error.message);
    return [];
  }
};

// 📌 רישום מכשיר חדש
export const registerDevice = async (deviceData: { macAddress: string; ipAddress: string; os: string; username: string }) => {
  try {
    console.log("📤 Registering device:", deviceData);
    const response = await axios.post(`${API_URL}/devices/register`, deviceData);

    if (response.data.apiKey) {
      localStorage.setItem("AGENT_API_KEY", response.data.apiKey);
      console.log("✅ API Key saved:", response.data.apiKey);
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ Error registering device:", error.response?.data || error.message);
  }
};

// 📌 שליחת פקודה מרחוק למכשיר (כיבוי, איתחול)
export const sendRemoteCommand = async (deviceId: string, command: string) => {
  try {
    console.log(`📡 Sending command '${command}' to device ${deviceId}`);
    const response = await axios.post(
      `${API_URL}/devices/command`,
      { deviceId, command },
      { headers: getAuthHeaders() }
    );

    console.log(`✅ Command '${command}' sent successfully`);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Error sending command '${command}' to device ${deviceId}:`, error.response?.data || error.message);
  }
};

// 📌 התקנת תוכנה בהתאם למערכת ההפעלה
export const installSoftware = async (deviceId: string, softwareUrl: string, os: string) => {
  try {
    console.log(`📦 Installing software on device ${deviceId}`);
    const response = await axios.post(
      `${API_URL}/software/install`,
      { deviceId, softwareUrl, os },
      { headers: getAuthHeaders() }
    );

    console.log(`✅ Software installed successfully on ${deviceId}`);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Error installing software on device ${deviceId}:`, error.response?.data || error.message);
  }
};