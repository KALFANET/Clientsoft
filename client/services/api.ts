import axios from "axios";

// כתובת ה-Backend הנכונה
const API_URL = "http://localhost:4000/api";

// קבלת רשימת מכשירים מהשרת
export const fetchDevices = async () => {
  const response = await axios.get(`${API_URL}/devices`);
  return response.data;
};

// רישום מכשיר חדש - כולל זיהוי מערכת ההפעלה
export const registerDevice = async (deviceData: { macAddress: string; ipAddress: string; os: string; username: string }) => {
  const response = await axios.post(`${API_URL}/devices/register`, deviceData);
  return response.data;
};

// שליחת פקודה מרחוק למכשיר (כיבוי, איתחול)
export const sendRemoteCommand = async (deviceId: string, command: string) => {
  const response = await axios.post(`${API_URL}/remote-control/command`, { deviceId, command });
  return response.data;
};

// התקנת תוכנה בהתאם למערכת ההפעלה
export const installSoftware = async (deviceId: string, softwareUrl: string, os: string) => {
  const response = await axios.post(`${API_URL}/software/install`, { deviceId, softwareUrl, os });
  return response.data;
};