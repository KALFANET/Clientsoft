import axios from 'axios';

// קבלת כתובת ה-Backend מהסביבה
const API_URL = process.env.REACT_APP_BACKEND_URL;

// פונקציה לקבלת כותרת Authorization עם ה-API Key
const getAuthHeaders = () => {
  const apiKey = localStorage.getItem('AGENT_API_KEY');
  if (!apiKey) {
    console.error('❌ No API Key found in localStorage!');
    return {};
  }
  return {
    Authorization: `Bearer ${apiKey}`,
  };
};

// קבלת רשימת מכשירים מהשרת
export const fetchDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices`, { headers: getAuthHeaders() });
    if (!Array.isArray(response.data.devices)) {
      console.error('⚠️ API response is not an array!', response.data);
      return response.data.devices || [];
    }
    return response.data.devices;
  } catch (error: any) {
    console.error('❌ Error fetching devices:', error.response?.data || error.message);
    return [];
  }
};

// רישום מכשיר חדש
export const registerDevice = async (deviceData: { macAddress: string; ipAddress: string; os: string; username: string }) => {
  try {
    const response = await axios.post(`${API_URL}/devices/register`, deviceData);
    if (response.data.apiKey) {
      localStorage.setItem('AGENT_API_KEY', response.data.apiKey);
      console.log('✅ API Key saved:', response.data.apiKey);
    }
    return response.data;
  } catch (error: any) {
    console.error('❌ Error registering device:', error.response?.data || error.message);
  }
};

// שליחת פקודה מרחוק למכשיר (כיבוי, איתחול וכו')
export const sendRemoteCommand = async (deviceId: string, command: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/devices/command`,
      { deviceId, command },
      { headers: getAuthHeaders() }
    );
    console.log(`📡 Command sent: ${command} to device ${deviceId}`);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error sending command:', error.response?.data || error.message);
  }
};

// התקנת תוכנה בהתאם למערכת ההפעלה
export const installSoftware = async (deviceId: string, softwareUrl: string, os: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/software/install`,
      { deviceId, softwareUrl, os },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error: any) {
    console.error('❌ Error installing software:', error.response?.data || error.message);
  }
};