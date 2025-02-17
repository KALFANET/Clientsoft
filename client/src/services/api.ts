import axios from "axios";

// כתובת ה-Backend
const API_URL = "http://localhost:4000/api";

// 🛠️ פונקציה שמוסיפה טוקן לכותרות
const getAuthHeaders = () => {
  const apiKey = localStorage.getItem("AGENT_API_KEY"); // ✅ טעינת ה-API_KEY מהאחסון
  if (!apiKey) {
    console.error("❌ API Key is missing! Please register the device first.");
    return {};
  }
  return { Authorization: `Bearer ${apiKey}` };
};

// 📌 קבלת רשימת מכשירים מהשרת
export const fetchDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices`, { headers: getAuthHeaders() });
    
    if (!Array.isArray(response.data.devices)) {
      console.error("⚠️ API response is not an array!", response.data);
      return response.data.devices || [];
    }
    
    return response.data.devices;
  } catch (error) {
    console.error("❌ Error fetching devices:", (error as any)?.response?.data || (error as any)?.message || error);
    return [];
  }
};

// 📌 רישום מכשיר חדש
export const registerDevice = async (deviceData: { macAddress: string; ipAddress: string; os: string; username: string }) => {
  try {
    const response = await axios.post(`${API_URL}/devices/register`, deviceData);
    if (response.data.apiKey) {
      localStorage.setItem("AGENT_API_KEY", response.data.apiKey);
      console.log("✅ API Key saved:", response.data.apiKey);
    }
    return response.data;
  } catch (error) {
    console.error("❌ Error registering device:", (error as any)?.response?.data || (error as any)?.message || error);
  }
};

// 📌 שליחת פקודה מרחוק למכשיר (כיבוי, איתחול)
export const sendRemoteCommand = async (deviceId: string, command: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/devices/command`,
      { deviceId, command },
      { headers: getAuthHeaders() }
    );
    console.log(`📡 Command sent: ${command} to device ${deviceId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error sending command '${command}' to device ${deviceId}:`, (error as any)?.response?.data || (error as any)?.message || error);
  }
};

// 📌 כיבוי מכשיר
export const shutdownDevice = async (deviceId: string) => {
  return sendRemoteCommand(deviceId, "shutdown");
};

// 📌 איתחול מכשיר
export const restartDevice = async (deviceId: string) => {
  return sendRemoteCommand(deviceId, "restart");
};

// 📌 התקנת תוכנה בהתאם למערכת ההפעלה
export const installSoftware = async (deviceId: string, softwareUrl: string, os: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/software/install`,
      { deviceId, softwareUrl, os },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(`❌ Error installing software on device ${deviceId}:`, (error as any)?.response?.data || (error as any)?.message || error);
  }
};