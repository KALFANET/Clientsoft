import axios from "axios";

const API_URL = "http://localhost:3000/api"; // כתובת ה-Backend

export const fetchDevices = async () => {
  const response = await axios.get(`${API_URL}/devices`);
  return response.data;
};

export const registerDevice = async (deviceData: { name: string }) => {
  const response = await axios.post(`${API_URL}/devices/register`, deviceData);
  return response.data;
};

export const sendRemoteCommand = async (deviceId: string, command: string) => {
  const response = await axios.post(`${API_URL}/remote-control/command`, { deviceId, command });
  return response.data;
};

export const installSoftware = async (deviceId: string, softwareUrl: string) => {
  const response = await axios.post(`${API_URL}/software/install`, { deviceId, softwareUrl });
  return response.data;
};